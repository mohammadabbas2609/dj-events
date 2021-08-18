import {
  ALL_EVENTS_FAIL,
  ALL_EVENTS_REQUEST,
  ALL_EVENTS_SUCCESS,
  CREATE_EVENT_FAIL,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  EVENT_DETAIL_FAIL,
  EVENT_DETAIL_REQUEST,
  EVENT_DETAIL_SUCCESS,
  EVENT_REQUEST,
  EVENT_REQUEST_FAILED,
  EVENT_REQUEST_SUCCESS,
  MY_EVENTS_FAIL,
  MY_EVENTS_REQUEST,
  MY_EVENTS_SUCCESS,
  UPDATE_EVENT_FAIL,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
} from "../constants/eventConstants";

export const eventReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case EVENT_REQUEST:
      return { loading: true };
    case EVENT_REQUEST_SUCCESS:
      return { loading: false, events: action.payload };
    case EVENT_REQUEST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const eventDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_DETAIL_REQUEST:
      return { loading: true };
    case EVENT_DETAIL_SUCCESS:
      return { loading: false, event: action.payload };
    case EVENT_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const allEventReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case ALL_EVENTS_REQUEST:
      return { loading: true };
    case ALL_EVENTS_SUCCESS:
      return {
        loading: false,
        events: action.payload.events,
        pages: action.payload.pages,
      };
    case ALL_EVENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createEventReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case CREATE_EVENT_REQUEST:
      return { loading: true, success: false };
    case CREATE_EVENT_SUCCESS:
      return { loading: false, success: true };
    case CREATE_EVENT_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const updateEventReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case UPDATE_EVENT_REQUEST:
      return { loading: true, success: false };
    case UPDATE_EVENT_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_EVENT_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const myEventReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case MY_EVENTS_REQUEST:
      return { loading: true };
    case MY_EVENTS_SUCCESS:
      return {
        loading: false,
        events: action.payload,
      };
    case MY_EVENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
