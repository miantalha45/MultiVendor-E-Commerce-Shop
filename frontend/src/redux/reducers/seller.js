import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isSeller: false,
    isLoading: true,
    seller: null,
    error: null,
    sellers: []
};

const sellerReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("LoadSellerRequest", (state) => {
            state.isLoading = true;
        })
        .addCase("LoadSellerSuccess", (state, action) => {
            state.isSeller = true;
            state.isLoading = false;
            state.seller = action.payload;
        })
        .addCase("LoadSellerFail", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isSeller = false;
        })
        .addCase("clearErrors", (state) => {
            state.error = null;
        })

        // get all sellers ---admin
        .addCase("getAllSellersRequest", (state) => {
            state.isLoading = true;
        })
        .addCase("getAllSellersSuccess", (state, action) => {
            state.isLoading = false;
            state.sellers = action.payload;
        })
        .addCase("getAllSellerFailed", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
});

export default sellerReducer;
