// src/DataTable.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchItems, Item } from '../redux/itemsSlice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Modal } from '@mui/material';

const DataTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.items);

  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);
  const [selectedItemID, setSelectedItemID] = React.useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleOpen = (item: Item) => {
    setSelectedItem(item);
    setSelectedItemID(item.guid);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
    setSelectedItemID(null);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>GUID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Path</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.guid}
                sx={{
                  backgroundColor: selectedItemID === item.guid ? 'rgba(0, 0, 255, 0.2)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 255, 0.1)',
                  },
                }}
                onClick={() => handleOpen(item)}
              >
                <TableCell>{item.guid}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.path.join('/')}</TableCell>
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
        <Modal open={open} onClose={handleClose}>
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
  );
};

export default DataTable;