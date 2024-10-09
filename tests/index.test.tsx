import { describe, test, expect } from "vitest";

import {
  ExcelDocument,
  renderToConsole,
  Spreadsheet,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../src/index";

renderToConsole(
  <ExcelDocument>
    <Spreadsheet>
      <TableHead>
        <TableRow>
          <TableCell>A</TableCell>
          <TableCell>B</TableCell>
          <TableCell>C</TableCell>
          <TableCell>D</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>a</TableCell>
          <TableCell>b</TableCell>
          <TableCell>c</TableCell>
          <TableCell>d</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>efgh</TableCell>
          <TableCell>efgh</TableCell>
          <TableCell>efgh</TableCell>
          <TableCell>efgh</TableCell>
        </TableRow>
      </TableBody>
    </Spreadsheet>
  </ExcelDocument>,
);
