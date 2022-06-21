import { createSlice } from '@reduxjs/toolkit'
const initialState: any = [];


const userListSlice = createSlice({
    name: 'usersActivity',
    initialState,
    reducers: {
        userActivityAdd(state, action) {

        },
        userActivityRemove(state, action) {

        }
    }
})

export const { userActivityAdd, userActivityRemove } = userListSlice.actions
export default userListSlice.reducer