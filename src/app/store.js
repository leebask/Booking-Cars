import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import carsReducer from '../features/carsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    cars: carsReducer
  },

})
