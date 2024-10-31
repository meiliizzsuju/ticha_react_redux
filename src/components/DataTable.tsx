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
import ItemModal from './itemModal';

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
                sx={{ '&:last-child td, &:last-child th': { border: 0}, cursor: "pointer" }}
                className='MuiTableRow-hover'
                onClick={() => handleOpen(item)}
                selected={selectedItemID === item.guid}
              >
                <TableCell>{item.guid}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.path.join('/')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ItemModal open={open} onClose={handleClose} selectedItem={selectedItem} />
    </div>
  );
};

export default DataTable;