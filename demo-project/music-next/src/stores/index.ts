import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './features/home';
import { createWrapper } from "next-redux-wrapper";

const store = configureStore({
  reducer: {
    home: homeReducer
  }
})

const wrapper = createWrapper(() => store)
export default wrapper;


export type IAppDispatch = typeof store.dispatch; // 这个是dispatch函数的类型
export type IAppRootState = ReturnType<typeof store.getState>; // 这个是rootState的类型