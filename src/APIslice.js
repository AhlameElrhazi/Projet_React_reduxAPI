import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchGroups = createAsyncThunk('groups/fetchGroups',() => {
    return  axios.get('http://localhost:4040/groups').then(responce=>responce.data);
});
//npm run start-json-server
const APISlice = createSlice({
  name: 'groups',
  initialState: {
    data: [], 
    loading: false, 
    error: null, 
    searchTerm: '',
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroups.pending, state => {
        state.loading = true; 
      })
    builder.addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
    builder.addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.data=[];
        state.error = action.error.message; 
      });
  },
});
export const { setSearchTerm} = APISlice.actions;
export default APISlice.reducer;
