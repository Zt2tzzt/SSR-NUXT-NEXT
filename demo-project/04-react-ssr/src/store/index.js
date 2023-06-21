import { configureStore } from "@reduxjs/toolkit";
import homeReducer from './features/home';

const store = configureStore({
  reducer: {
    home: homeReducer
  },
  // devTools: true // 默认值
})

export default store