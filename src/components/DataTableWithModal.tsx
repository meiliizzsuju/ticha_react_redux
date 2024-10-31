import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Modal } from '@mui/material';


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
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedItemID, setSelectedItemID] = useState<string | null>(null);

  const handleOpen = (item: Item) => {
    setSelectedItem(item);
    setSelectedItemID(item.guid);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
    setSelectedItemID(null)
  };

  return (
    <div>
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
            {data.map((item) => (
              <TableRow
                key={item.guid}
                sx={{ '&:last-child td, &:last-child th': { border: 0, cursor: "pointer" } }}
                className='MuiTableRow-hover'
                onClick={() => handleOpen(item)}
                selected={selectedItemID === item.guid}
              >
                <TableCell component="th" scope="row">
                  {item.guid}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>{item.path}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          height: 300,
          flexGrow: 1,
          minWidth: 300,
          transform: 'translateZ(0)',
        }}
      >
        <Modal
          open={open} onClose={handleClose}
        >
          <Box
            sx={(theme) => ({
              position: 'relative',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: theme.shadows[5],
              p: 4,
            })}
          >
            {selectedItem && (
              <div>
                <p><strong>Path:</strong> {selectedItem.path.join(', ')}</p>
                {Object.entries(selectedItem.properties).map(([key, value]) => (
                  <p key={key}><strong>{key}:</strong> {value}</p>
                ))}
              </div>
            )}
          </Box>
        </Modal>
      </Box>
    </div>
  )
}

export default DataTable