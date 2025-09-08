import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    event: null,
    error: null,
    success: false,
    events: [],
    message: null,
    allEvents: [],
};

export const eventReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("eventCreateRequest", (state) => {
            state.isLoading = true;
        })
        .addCase("eventCreateSuccess", (state, action) => {
            state.isLoading = false
            state.event = action.payload;
            state.success = true;
        })
        .addCase("eventCreateFail", (state, action) => {
            state.isLoading = false
            state.event = action.payload;
            state.success = false;
        })
        .addCase("clearErrors", (state) => {
            state.error = null;
        })

        // get all events state
        .addCase("getAllEventsShopRequest", (state) => {
            state.isLoading = true
        })
        .addCase("getAllEventsShopSuccess", (state, action) => {
            state.isLoading = false;
            state.events = action.payload;
        })
        .addCase("getAllEventsShopFail", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        // delete event state
        .addCase("deleteEventRequest", (state) => {
            state.isLoading = true
        })
        .addCase("deleteEventSuccess", (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("deleteEventFail", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        // get all events state
        .addCase("getAllEventsRequest", (state) => {
            state.isLoading = true
        })
        .addCase("getAllEventsSuccess", (state, action) => {
            state.isLoading = false;
            state.allEvents = action.payload;
        })
        .addCase("getAllEventsFail", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
});