import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    product: null,
    error: null,
    success: false,
    products: [],
    message: null,
    allProducts: []
};

export const productReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("productCreateRequest", (state) => {
            state.isLoading = true;
        })
        .addCase("productCreateSuccess", (state, action) => {
            state.isLoading = false
            state.product = action.payload;
            state.success = true;
        })
        .addCase("productCreateFail", (state, action) => {
            state.isLoading = false
            state.product = action.payload;
            state.success = false;
        })
        .addCase("clearErrors", (state) => {
            state.error = null;
        })

        // get all products state
        .addCase("getAllProductsRequest", (state) => {
            state.isLoading = true
        })
        .addCase("getAllProductsSuccess", (state, action) => {
            state.isLoading = false;
            state.allProducts = action.payload;
        })
        .addCase("getAllProductsFail", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        // get all shop products state
        .addCase("getAllProductsShopRequest", (state) => {
            state.isLoading = true
        })
        .addCase("getAllProductsShopSuccess", (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        })
        .addCase("getAllProductsShopFail", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        // delete product state
        .addCase("deleteProductRequest", (state) => {
            state.isLoading = true
        })
        .addCase("deleteProductSuccess", (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("deleteProductFail", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
});