import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../redux/slicer'

export const store = configureStore({
  reducer: {
    auth: AuthReducer
  },
})