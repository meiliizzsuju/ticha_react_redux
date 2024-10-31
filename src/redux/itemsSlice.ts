import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the Item type
type Properties = {
  [key: string]: string | number;
};

export type Item = {
  guid: string;
  name: string;
  path: Array<string>;
  properties: Properties;
};

// Define the initial state
interface ItemsState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

// Asynchronous thunk to fetch items
export const fetchItems = createAsyncThunk<Item[]>('items/fetchItems', async () => {
  const response = await axios.get<Item[]>('http://localhost:8080/items');
  return response.data;
});

// Create the items slice
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch items';
      });
  },
});

export default itemsSlice.reducer;
