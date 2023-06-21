import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchHomeData = createAsyncThunk(
  'home/fetchHomeData',
  async (payload, { dispatch, getState }) => {
    const res = await axios.get('http://codercba.com:9060/juanpi/api/homeInfo')
    return res.data
  }
)

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    counter: 1000,
    homeInfo: null
  },
  reducers: {
    incrementAction(state, { payload }) {
      state.counter += payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchHomeData.fulfilled, (state, { payload, type }) => {
      console.log('type:', type)
      console.log('payload:', payload)
      state.homeInfo = payload
    })
  }
})



export const { incrementAction } = homeSlice.actions
export default homeSlice.reducer
