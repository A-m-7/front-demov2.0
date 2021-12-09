import { LOGOUT, REGISTER } from "./actionTypes.js";
import axios from "axios";
import { APILINK } from "../EndPoint";
import Cookies from "js-cookie";

export const userLogin = async (userdata, history, redirect) => {
  axios
    .post(APILINK + "/auth/jwt/create", userdata)
    .then((res) => {
      if (res.data) {
        console.log(res.data)
        if (res.data) {
          const accessToken = res.data.access;
          const refreshToken = res.data.refresh;
          localStorage.setItem("refreshToken", refreshToken);
          Cookies.set("accessToken", accessToken);
          history.push(redirect)
        }
      }
    })
    .catch((err) => {
      console.log(err)
      // reject(err);
      if (err.response) {
        console.log(err.response.data.detail);
      }
    });
};

export const userRegister = (userdata, history) => async (dispatch) => {
  const regiserdata = await new Promise((resolve, reject) => {
    axios
      .post(APILINK + "/student_signup", userdata)
      .then((res) => {
        resolve(res.data);
        if (res.data) {
          dispatch({ type: REGISTER, payload: res.data });

        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          resolve(err.response.data);
        }
      });
  });
  return regiserdata;
};

export const LogOut = () => async (dispatch) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  dispatch({ type: LOGOUT });
};
