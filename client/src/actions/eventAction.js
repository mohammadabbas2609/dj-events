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
import axios from "axios";

export const getLatestEvent = () => async dispatch => {
  try {
    dispatch({
      type: EVENT_REQUEST,
    });

    const { data } = await axios.get("/api/event/latest");

    dispatch({
      type: EVENT_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_REQUEST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEventDetails = id => async dispatch => {
  try {
    dispatch({
      type: EVENT_DETAIL_REQUEST,
    });

    const { data } = await axios.get(`/api/event/${id}`);

    dispatch({
      type: EVENT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllEvents =
  (pageNumber = 1, title = "") =>
  async dispatch => {
    try {
      dispatch({
        type: ALL_EVENTS_REQUEST,
      });

      const { data } = await axios.get(
        `/api/event?pageNumber=${pageNumber}&title=${title}`
      );

      dispatch({
        type: ALL_EVENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_EVENTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const createEvent =
  (title, description, venue, performers, date, time, image = "") =>
  async dispatch => {
    try {
      dispatch({
        type: CREATE_EVENT_REQUEST,
      });

      const config = {
        credentials: true,
      };

      const { data } = await axios.post(
        `/api/event/`,
        {
          title,
          description,
          venue,
          performers,
          date,
          time,
          image,
        },
        config
      );

      dispatch({
        type: CREATE_EVENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_EVENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const updateEvent =
  (
    title = "",
    description = "",
    venue = "",
    performers = "",
    date = "",
    time = "",
    image = "",
    id
  ) =>
  async dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT_REQUEST,
      });

      const config = {
        credentials: true,
      };

      const { data } = await axios.put(
        `/api/event/${id}`,
        {
          title,
          description,
          venue,
          performers,
          date,
          time,
          image,
        },
        config
      );

      dispatch({
        type: UPDATE_EVENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_EVENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const myEvents = () => async dispatch => {
  try {
    dispatch({
      type: MY_EVENTS_REQUEST,
    });

    const config = {
      credentials: true,
    };

    const { data } = await axios.get(`/api/event/myevents`, config);

    dispatch({
      type: MY_EVENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_EVENTS_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
