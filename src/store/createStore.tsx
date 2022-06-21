import { configureStore } from '@reduxjs/toolkit';
import usersActivityReducer from '../reducers/userListSlice'
import {dataUserList} from '../components/blueprintTable/dataUserList'

export const store = configureStore({
  reducer: {
    usersActivity: usersActivityReducer,
    dataUserList: dataUserList,
  }
})