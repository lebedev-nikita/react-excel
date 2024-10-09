import { JSX, ReactElement } from "react";

export type ExcelDocumentProps<T> = {
  children: ReactElement<SpreadsheetProps<T>> | ReactElement<SpreadsheetProps<T>>[];
};

export function ExcelDocument<T>(props: ExcelDocumentProps<T>) {
  return null;
}

export type SpreadsheetProps<T> = {
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
  maxRows?: number;
  data: AsyncIterable<T> | Iterable<T>;
  render: (elem: NoInfer<T>) => ReactElement<TableRowProps> | Promise<ReactElement<TableRowProps>>;
};

export function TableBody<T>(props: TableBodyProps<T>) {
  return null;
}

export type TableRowProps = {
  children:
    | (null | undefined | false | ReactElement<TableCellProps>)
    | (null | undefined | false | ReactElement<TableCellProps>)[];
};

export function TableRow(props: TableRowProps) {
  return null;
}

export type TableCellProps = {
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

    {
      const rows = childrenToArray(head.props.children);
      for (const row of rows) {
        for (const cell of childrenToArray(row.props.children)) {
          if (!cell) continue;
          str += `'${cell.props.children}'`;
        }
        str += "\n";
      }
      if (rows.length > 0) {
        str += "----------\n";
      }
    }

    {
      let rowCount = 0;
      for await (const dataItem of body.props.data) {
        const row = await body.props.render(dataItem);
        for (const cell of childrenToArray(row.props.children)) {
          if (!cell) continue;
          str += `'${cell.props.children ?? ""}' `;
        }
        str += "\n";
        if (++rowCount > (body.props.maxRows ?? DEFAULT_MAX_ROWS)) break;
      }
    }
  }

  console.log(str.trim());
}

export async function renderToFile(elem: JSX.Element) {
  console.log(elem);
}

export async function renderToBuffer(elem: JSX.Element) {
  console.log(elem);
}

function childrenToArray<T>(arr: T | T[] | undefined): T[] {
  if (Array.isArray(arr)) return arr;
  if (arr === undefined) return [];
  return [arr];
}
