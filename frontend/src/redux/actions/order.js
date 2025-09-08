import axios from "axios";
import { server } from "../../server";


// get all orders of user
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
    try {
        dispatch({
            type: "getAllOrdersUserRequest"
        });

        const { data } = await axios.get(`${server}/order/get-all-orders/${userId}`, { withCredentials: true });


        dispatch({
            type: "getAllOrdersUserSuccess",
            payload: data.orders
        });
    } catch (error) {
        dispatch({
            type: "getAllOrdersUserFail",
            payload: error.response.data.message,
        });
    }
}

// get all orders of seller
export const getAllOrdersOfSeller = (shopId) => async (dispatch) => {
    try {
        dispatch({
            type: "getAllOrdersSellerRequest"
        });

        const { data } = await axios.get(`${server}/order/get-seller-all-orders/${shopId}`, { withCredentials: true });


        dispatch({
            type: "getAllOrdersSellerSuccess",
            payload: data.orders
        });
    } catch (error) {
        dispatch({
            type: "getAllOrdersSellerFail",
            payload: error.response.data.message,
        });
    }
}