import { JSX, ReactElement } from "react";
import * as path from "node:path";
import * as fs from "node:fs/promises";
import excel from "exceljs";

export type ExcelDocumentProps<T> = {
  children: ReactElement<SpreadsheetProps<T>> | ReactElement<SpreadsheetProps<T>>[];
};

export function ExcelDocument<T>(props: ExcelDocumentProps<T>) {
  return null;
}

export type SpreadsheetProps<T> = {
  name: string;
  maxRows?: number;
  children: [ReactElement<TableHeadProps>, ReactElement<TableBodyProps<T>>];
};

export function Spreadsheet<T>(props: SpreadsheetProps<T>) {
  return null;
}

export type TableHeadProps = {
  children: ReactElement<TableRowProps> | ReactElement<TableRowProps>[];
};

export function TableHead(props: TableHeadProps) {
  return null;
}

export type TableBodyProps<T> = {
  data: AsyncIterable<T> | Iterable<T>;
  render: (elem: NoInfer<T>) => ReactElement<TableRowProps> | Promise<ReactElement<TableRowProps>>;
};

export function TableBody<T>(props: TableBodyProps<T>) {
  return null;
}

export type TableRowProps = {
  alignment?: Partial<excel.Alignment>;
  font?: Partial<excel.Font>;
  fill?: excel.Fill;

  children:
    | (null | undefined | false | ReactElement<TableCellProps>)
    | (null | undefined | false | ReactElement<TableCellProps>)[];
};

export function TableRow(props: TableRowProps) {
  return null;
}

export type TableCellProps = {
  alignment?: Partial<excel.Alignment>;
  font?: Partial<excel.Font>;

  children: string | number | boolean | undefined | null;
};

export function TableCell(props: TableCellProps) {
  return null;
}

const DEFAULT_MAX_ROWS = 100_000;

export async function renderToConsole<T>(excelDoc: ReactElement<ExcelDocumentProps<T>>) {
  let str = "";

  for (const sheet of childrenToArray(excelDoc.props.children)) {
    const [head, body] = sheet.props.children;

    let rowIndex = 1;
    const maxRows = sheet.props.maxRows ?? DEFAULT_MAX_ROWS;

    {
      for (const row of childrenToArray(head.props.children)) {
        if (rowIndex > maxRows) break;
        for (const cell of childrenToArray(row.props.children)) {
          if (!cell) continue;
          str += `'${cell.props.children}'`;
        }
        str += "\n";
        rowIndex++;
      }
      if (rowIndex > 1) {
        str += "----------\n";
      }
    }

    {
      for await (const dataItem of body.props.data) {
        if (rowIndex > maxRows) break;
        const row = await body.props.render(dataItem);
        for (const cell of childrenToArray(row.props.children)) {
          if (!cell) continue;
          str += `'${cell.props.children ?? ""}' `;
        }
        str += "\n";
        rowIndex++;
      }
    }
  }

  console.log(str.trim());
}

export async function renderToFile<T>(
  filePath: string,
  excelDoc: ReactElement<ExcelDocumentProps<T>>,
) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  const wb = new excel.stream.xlsx.WorkbookWriter({
    filename: filePath,
    useStyles: true,
  });

  for (const sheet of childrenToArray(excelDoc.props.children)) {
    const _sheet = wb.addWorksheet(sheet.props.name);
    const [head, body] = sheet.props.children;

    let rowIndex = 1;
    const maxRows = sheet.props.maxRows ?? DEFAULT_MAX_ROWS;

    for (const row of childrenToArray(head.props.children)) {
      if (rowIndex > maxRows) break;
      const _row = _sheet.getRow(rowIndex);

      if (row.props.font) _row.font = row.props.font;
      if (row.props.alignment) _row.alignment = row.props.alignment;
      if (row.props.fill) _row.fill = row.props.fill;

      let cellIndex = 1;

      for (const cell of childrenToArray(row.props.children)) {
        if (!cell) continue;
        const _cell = _row.getCell(cellIndex);

        if (cell.props.alignment) _cell.alignment = cell.props.alignment;
        if (cell.props.font) _cell.font = cell.props.font;

        _cell.value = cell.props.children;
        cellIndex++;
      }

      _row.commit();
      rowIndex++;
    }

    for await (const data of body.props.data) {
      if (rowIndex > maxRows) break;
      const row = await body.props.render(data);
      const _row = _sheet.getRow(rowIndex);

      if (row.props.font) _row.font = row.props.font;
      if (row.props.alignment) _row.alignment = row.props.alignment;
      if (row.props.fill) _row.fill = row.props.fill;

      let cellIndex = 1;

      for (const cell of childrenToArray(row.props.children)) {
        if (!cell) continue;
        const _cell = _row.getCell(cellIndex);

        if (cell.props.alignment) _cell.alignment = cell.props.alignment;
        if (cell.props.font) _cell.font = cell.props.font;

        _cell.value = cell.props.children;
        cellIndex++;
      }

      _row.commit();
      rowIndex++;
    }
  }

  await wb.commit();
}

export async function renderToBuffer(elem: JSX.Element) {
  console.log(elem);
}

function childrenToArray<T>(arr: T | T[] | undefined): T[] {
  if (Array.isArray(arr)) return arr;
  if (arr === undefined) return [];
  return [arr];
}
