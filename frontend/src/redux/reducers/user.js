import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
    successMessage: null,
    addressLoading: false
};

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("LoadUserRequest", (state) => {
            state.loading = true;
        })
        .addCase("LoadUserSuccess", (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload;
        })
        .addCase("LoadUserFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })

        // update user information
        .addCase("updateUserInfoRequest", (state) => {
            state.loading = true;
        })
        .addCase("updateUserInfoSuccess", (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase("updateUserInfoFailed", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // update user address
        .addCase("updateUserAddressRequest", (state) => {
            state.addressLoading = true;
        })
        .addCase("updateUserAddressSuccess", (state, action) => {
            state.addressLoading = false;
            state.user = action.payload.user;
            state.successMessage = action.payload.successMessage;
        })
        .addCase("updateUserAddressFailed", (state, action) => {
            state.addressLoading = false;
            state.error = action.payload;
        })

        // delete user address
        .addCase("deleteUserAddressRequest", (state) => {
            state.addressLoading = true;
        })
        .addCase("deleteUserAddressSuccess", (state, action) => {
            state.addressLoading = false;
            state.user = action.payload.user;
            state.successMessage = action.payload.successMessage;
        })
        .addCase("deleteUserAddressFailed", (state, action) => {
            state.addressLoading = false;
            state.error = action.payload;
        })


        .addCase("clearErrors", (state) => {
            state.error = null;
        })
        .addCase("clearMessages", (state) => {
            state.successMessage = null;
        })
});

export default userReducer;