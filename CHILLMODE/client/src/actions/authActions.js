import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });
  let url = "http://localhost:5500/auth/user";
  if (process.env.NODE_ENV === "production") {
    url = "/auth/user";
  }
  axios
    .get(url, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: `${res.data.firstName} ${res.data.lastName}`,
      })
    )
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Register User
export const register = ({ firstName, lastName, email, password }) => async (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = {
    firstName,
    lastName,
    email,
    password,
  };
  console.log(body);
  let url = "http://localhost:5500/auth/register";
  if (process.env.NODE_ENV === "production") {
    url = "/auth/register";
  }

  axios
    .post(url, body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data.message , err.response.status, "REGISTER_FAIL")
      );
      console.log("err",err.response)
      dispatch({
        type: REGISTER_FAIL,
        payload: "Inavlid Input",
      });
    });
};

// Login User
export const login = ({ email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = { email, password };
  let url = "http://localhost:5500/auth/create-session";
  if (process.env.NODE_ENV === "production") {
    url = "/auth/create-session";
  }
  axios
    .post(url, body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data.message, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const guestLogin = () => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const email = "rahul@gmail.com";
  const password = "rahulchawla";
  const body = {email, password};
  let url = "http://localhost:5500/auth/create-session";
  if (process.env.NODE_ENV === "production") {
    url = "/auth/create-session";
  }
  axios
    .post(url, body, config)
    .then((res) =>
      dispatch({
        type: "GUEST_LOGIN",
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};
// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
