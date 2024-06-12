import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiAxios from "../../config/axiosConfig";

export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUsers", async() => {
        const response = await apiAxios.get("users/self")
        return response.data
})

export const usersSlice = createSlice({
        name: "users",
        initalState:{
                currentUser: {},
                currentUserStatus: "idle",
                isLoggedIn: false
        },
        reducers: {
               isLoggedInUpdated(state, action) {
                        state.isLoggedIn = action.payload
               },
                //Clear user info when logging out 
                currentUserUpdated(state, action) {
                        state.currentUser = action.payload
                },
                // Used to reset user stateus on logout
                currentUserStatusUpdated(state, action) {
                        state.currentUserStatus = action.payload
                }
        },
        extraReducers: (builder) => {
                // Reducers for fetching user
                builder
                        .addCase(fetchCurrentUser.pending, (state, action) => {
                        state.currentUserStatus = "loading"
                })
                        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                        state.currentUserStatus = "succeeded"
                        state.currentUser = action.payload
                })
                        .addCase(fetchCurrentUser.rejected, (state, action) => {
                        state.currentUserStatus = 'failed'
                })
        }
});

export const {  isLoggedInUpdated,
                currentUserUpdated,
                currentUserStatusUpdated
} = usersSlice.actions;


export const selectCurrentUserStatus = state => state.users.currentUserStatus;
export const selectCurrentUser = state => state.users.currentUser;
export const selectIsLoggedIn = state => state.users.isLoggedIn;
export default usersSlice.reducer;