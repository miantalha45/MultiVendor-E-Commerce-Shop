import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    order: null,
    error: null,
    success: false,
    orders: [],
    message: null,
    adminOrderLoading: false,
    adminOrders: [],
};

export const orderReducer = createReducer(initialState, (builder) => {
    builder
        // get all orders of a user
        .addCase("getAllOrdersUserRequest", (state) => {
            state.isLoading = true
        })
        .addCase("getAllOrdersUserSuccess", (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
        })
        .addCase("getAllOrdersUserFail", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        // get all orders of a seller
        .addCase("getAllOrdersSellerRequest", (state) => {
            state.isLoading = true
        })
        .addCase("getAllOrdersSellerSuccess", (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
        })
        .addCase("getAllOrdersSellerFail", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        // get all orders of a admin
        .addCase("adminAllOrdersRequest", (state) => {
            state.adminOrderLoading = true;
        })
        .addCase("adminAllOrdersSuccess", (state, action) => {
            state.adminOrderLoading = false;
            state.adminOrders = action.payload;
        })
        .addCase("adminAllOrdersFailed", (state, action) => {
            state.adminOrderLoading = false;
            state.error = action.payload;
        })
});
