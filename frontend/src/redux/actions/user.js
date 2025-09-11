import axios from "axios";
import { server } from "../../server";

// load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest",
        });
        const { data } = await axios.get(`${server}/user/getUser`, {
            withCredentials: true,
        });
        // console.log(data)
        dispatch({
            type: "LoadUserSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error.response.data.message,
        });
        // console.error(error)
    }
};


// load seller
export const loadSeller = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadSellerRequest",
        });
        const { data } = await axios.get(`${server}/shop/getSeller`, {
            withCredentials: true,
        });
        // console.log(data)
        dispatch({
            type: "LoadSellerSuccess",
            payload: data.shop,
        });
    } catch (error) {
        dispatch({
            type: "LoadSellerFail",
            payload: error.response.data.message,
        });
        console.error(error)
    }
};

// update user information
export const updateUserInformation = (name, email, phoneNumber, password) => async (dispatch) => {
    try {

        dispatch({
            type: "updateUserInfoRequest",
        });

        const { data } = await axios.put(`${server}/user/update-user-info`, {
            email,
            password,
            phoneNumber,
            name,

        }, { withCredentials: true });

        dispatch({
            type: "updateUserInfoSuccess",
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: "updateUserInfoFailed",
            payload: error.response.data.message,
        })
        console.log(error)
    }
}

// update the user address
export const updatUserAddress = (
    country,
    state,
    city,
    address1,
    address2,
    zipCode,
    addressType) => async (dispatch) => {
        try {

            dispatch({
                type: "updateUserAddressRequest",
            });

            const { data } = await axios.put(`${server}/user/update-user-addresses`, {
                country,
                state,
                city,
                address1,
                address2,
                zipCode,
                addressType
            }, { withCredentials: true });

            // console.log(data.user);

            dispatch({
                type: "updateUserAddressSuccess",
                payload: { user: data.user, successMessage: "User address updated successfully" },
            })
        } catch (error) {
            dispatch({
                type: "updateUserAddressFailed",
                payload: error.response.data.message,
            })
            console.log(error.response.data.message)
        }
    }


// update the user delete
export const deleteUserAddress = (id) => async (dispatch) => {
    try {

        dispatch({
            type: "deleteUserAddressRequest",
        });

        const { data } = await axios.delete(`${server}/user/delete-user-address/${id}`,
            { withCredentials: true });

        // console.log(data.user);

        dispatch({
            type: "deleteUserAddressSuccess",
            payload: { user: data.user, successMessage: "User address deleted successfully" },
        })
    } catch (error) {
        dispatch({
            type: "deleteUserAddressFailed",
            payload: error.response.data.message,
        });
        console.log(error.response.data.message)
    }
}

// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllUsersRequest",
        });

        const { data } = await axios.get(`${server}/user/admin-all-users`, {
            withCredentials: true,
        });

        dispatch({
            type: "getAllUsersSuccess",
            payload: data.users,
        });
    } catch (error) {
        dispatch({
            type: "getAllUsersFailed",
            payload: error.response.data.message,
        });
    }
};
