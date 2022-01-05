import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  items:[],
  loading: false
}

export const getItems = createAsyncThunk('item/getItems', async () => {
    const res = axios.get('/api/items')
    return res
  }
)

export const deleteItem = createAsyncThunk('item/deleteItem', async (obj) => {
  axios.delete(`/api/items/${obj.id}`)
  return obj.id
})

export const addItem = createAsyncThunk('item/addItem',  async(obj) => {
  axios.post('/api/items', obj.item)
  return obj.item
})

export const itemSlice = createSlice({
  name: 'item',
  initialState: { value: initialState },
  reducers: {
    itemsLoading: ( state, action ) => {
      state.value.loading = true
    },
  },
  extraReducers: {
    [getItems.pending]: (state) => {
      state.value.loading = true
    },
    [getItems.fulfilled]: (state, {payload}) => {
      state.value.items = payload.data
      state.value.loading = false
    },
    [getItems.rejected]: (state, action) => {
      state.value.items = [{err: ""}]
      state.value.loading = false
    },
    [deleteItem.pending]: (state) => {
      state.value.loading = true
    },
    [deleteItem.fulfilled]: (state, {payload}) => {
      state.value.items = state.value.items.filter( element => element._id !== payload )
      state.value.loading = false
    },
    [deleteItem.rejected]: (state, action) => {
      state.value.items = [{err: ""}]
      state.value.loading = false
    },
    [addItem.pending]: (state) => {
      state.value.loading = true
    },
    [addItem.fulfilled]: (state, {payload}) => {
      state.value.items.push(payload)
      state.value.loading = false
    },
    [addItem.rejected]: (state, action) => {
      state.value.items = [{err: ""}]
      state.value.loading = false
    },
  }
});

export const {itemsLoading} = itemSlice.actions;

export default itemSlice.reducer;