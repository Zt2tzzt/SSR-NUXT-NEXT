import type { SearchSuggest } from '@/types/home'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { getSearchSuggest } from '@/service/features/home'

interface IHomeState {
  counter: number
  navbar: SearchSuggest | null
}
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    counter: 10,
    navbar: null
  } as IHomeState,
  reducers: {
    increment(state, { type, payload }) {
      state.counter += payload
    }
  },
  extraReducers(builder) {
    // Hydrate的操作, 保证服务端端和客户端数据的一致性
    builder
      .addCase(HYDRATE, (state, { payload }: any) => {
        return {
          ...state, // state -> initialState
          ...payload.home // action.payload -> rootState
        }
      })
      .addCase(fetchSearchSuggest.fulfilled, (state, { payload }) => {
        state.navbar = payload
      })
  }
})

export const fetchSearchSuggest = createAsyncThunk('fetchSearchSuggest', async () => {
  const res = await getSearchSuggest()
  return res.data
})

export const { increment } = homeSlice.actions
export default homeSlice.reducer
