import axios from "axios";
import { __DJ_EVENTS_USER } from "../constants/localStorageConstant";
import {
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_RESET,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/user/register",
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem(__DJ_EVENTS_USER, JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/user/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem(__DJ_EVENTS_USER, JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const logout = () => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };

    await axios.get("/api/user/logout", config);
    dispatch({
      type: USER_LOGOUT,
    });

    dispatch({
      type: USER_PROFILE_RESET,
    });

    dispatch({
      type: USER_REGISTER_RESET,
    });

    localStorage.removeItem(__DJ_EVENTS_USER);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProfile = () => async dispatch => {
  try {
    dispatch({
      type: GET_USER_PROFILE_REQUEST,
    });

    const config = {
      credential: true,
    };

    const { data } = await axios.get("/api/user/profile", config);

    dispatch({
      type: GET_USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateProfile =
  (name = "", email = "", password = null) =>
  async dispatch => {
    try {
      dispatch({
        type: UPDATE_USER_PROFILE_REQUEST,
      });

      const config = {
        credential: true,
      };

      const { data } = await axios.put(
        "/api/user/updateprofile",
        { name, email, password },
        config
      );

      dispatch({
        type: UPDATE_USER_PROFILE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: GET_USER_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };
