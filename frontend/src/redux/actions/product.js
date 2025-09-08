import axios from "axios";
import { server } from "../../server";


// create produc
export const createProduct = (newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "productCreateRequest"
        });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`${server}/product/create-product`, newForm, config);


        dispatch({
            type: "productCreateSuccess",
            payload: data.product
        });
    } catch (error) {
        dispatch({
            type: "productCreateFail",
            payload: error.response.data.message,
        });
    }
}

// get all shop products
export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProductsRequest"
        });

        const { data } = await axios.get(`${server}/product/get-all-products`);


        dispatch({
            type: "getAllProductsSuccess",
            payload: data.products
        });
    } catch (error) {
        dispatch({
            type: "getAllProductsFail",
            payload: error.response.data.message,
        });
    }
}

// get all shop products
export const getAllProductsShop = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProductsShopRequest"
        });

        const { data } = await axios.get(`${server}/product/get-all-products-shop/${id}`);


        dispatch({
            type: "getAllProductsShopSuccess",
            payload: data.products
        });
    } catch (error) {
        dispatch({
            type: "getAllProductsShopFail",
            payload: error.response.data.message,
        });
    }
}

// delete product
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProductRequest"
        });

        const { data } = await axios.delete(`${server}/product/delete-product-shop/${id}`, {
            withCredentials: true
        });


        dispatch({
            type: "deleteProductSuccess",
            payload: data.products
        });
    } catch (error) {
        dispatch({
            type: "deleteProductFail",
            payload: error.response.data.message,
        });
    }
}