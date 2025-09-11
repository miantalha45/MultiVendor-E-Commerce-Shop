import axios from "axios";
import { server } from "../../server";


// create produc
export const createEvent = (newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "eventCreateRequest"
        });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`${server}/event/create-event`, newForm, config);


        dispatch({
            type: "eventCreateSuccess",
            payload: data.event
        });
    } catch (error) {
        dispatch({
            type: "eventCreateFail",
            payload: error.response.data.message,
        });
        console.error(error)
    }
}

// get all events
export const getAllEventsShop = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getAllEventsShopRequest"
        });

        const { data } = await axios.get(`${server}/event/get-all-event-shop/${id}`);


        dispatch({
            type: "getAllEventsShopSuccess",
            payload: data.events
        });
    } catch (error) {
        dispatch({
            type: "getAllEventsShopFail",
            payload: error.response.data.message,
        });
    }
}

// delete event
export const deleteevent = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteEventRequest"
        });

        const { data } = await axios.delete(`${server}/event/delete-shop-event/${id}`, {
            withCredentials: true
        });


        dispatch({
            type: "deleteEventSuccess",
            payload: data.events
        });
    } catch (error) {
        dispatch({
            type: "deleteEventFail",
            payload: error.response.data.message,
        });
    }
}

// get all events
export const getAllEvents = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllEventsRequest",
        });

        const { data } = await axios.get(`${server}/event/get-all-events`);

        // console.log(data)

        dispatch({
            type: "getAllEventsSuccess",
            payload: data.events,
        });
    } catch (error) {
        dispatch({
            type: "getAllEventsFailed",
            payload: error.response.data.message,
        });
    }
};
