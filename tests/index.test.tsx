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
        <TableRow>
          {false != false && <TableCell>E</TableCell>}
          {false == false && <TableCell>F</TableCell>}
          <TableCell>G</TableCell>
          <TableCell>H</TableCell>
        </TableRow>
      </TableHead>
      <TableBody
        maxRows={10}
        data={tuples(4)}
        render={(data) => (
          <TableRow>
            <TableCell>{data[0]}</TableCell>
            <TableCell>{data[1]}</TableCell>
            <TableCell>{data[2]}</TableCell>
            <TableCell>{data[3]}</TableCell>
          </TableRow>
        )}
      />
    </Spreadsheet>
  </ExcelDocument>,
);

async function* tuples(n: number) {
  let i = 0;
  while (true) {
    const ret: number[] = [];
    while (ret.length < n) {
      ret.push(i++);
    }
    yield ret;
  }
}
