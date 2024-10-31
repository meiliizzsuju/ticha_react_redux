import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//DataType
type Properties = {
    [key: string]: string | number;
};

type Item = {
    guid: string;
    name: string;
    path: Array<string>;
    properties: Properties;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Item[] = [{ guid: "guid1", name: "name1", path: ["path1", "path2"], properties: { propString: "value1", propNumber: 1, date: "10/10/2014" } }, { guid: "guid2", name: "name2", path: ["path3", "path4"], properties: { "property3": "value3", "property4": "value4" } }, { guid: "guid3", name: "nfda df asf asdame3", path: ["path5", "path6"], properties: { "property5": "value5", "property6": "value6" } }, { guid: "guid4", name: "name4", path: ["path7", "path8"], properties: { "property7": "value7", "property8": "value8" } }, { guid: "guid5", name: "name5 fdaf adsfsadas", path: ["path9", "path10"], properties: { "property9": "value9", "property10": "value10" } }]




const DataTable = () => {

    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>GUI</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Path</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <TableRow
              key={data.guid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className='MuiTableRow-hover'
            >
              <TableCell component="th" scope="row">
                {data.guid}
              </TableCell>
              <TableCell component="th" scope="row">
                {data.name}
              </TableCell>
              <TableCell>{data.path}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default DataTable