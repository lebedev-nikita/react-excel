import { ReactElement, JSX, ReactNode } from "react";

export type ExcelDocumentProps = {
  children?: ReactElement | ReactElement[];
};

export function ExcelDocument(props: ExcelDocumentProps) {
  return null;
}

export type SpreadsheetProps = {
  children?: ReactElement | ReactElement[];
};

export function Spreadsheet(props: SpreadsheetProps) {
  return null;
}

export type TableHeadProps = {
  children?: ReactElement | ReactElement[];
};

export function TableHead(props: TableHeadProps) {
  return null;
}

export type TableBodyProps = {
  children?: ReactElement | ReactElement[];
};

export function TableBody(props: TableBodyProps) {
  return null;
}

export type TableRowProps = {
  children?: ReactNode;
};

export function TableRow(props: TableRowProps) {
  return null;
}

export type TableCellProps = {
  children?: ReactNode;
};

export function TableCell(props: TableCellProps) {
  return null;
}

export function renderToConsole(elem: JSX.Element) {
  console.log(elem);
}

export function renderToFile(elem: JSX.Element) {
  console.log(elem);
}

export function renderToBuffer(elem: JSX.Element) {
  console.log(elem);
}
