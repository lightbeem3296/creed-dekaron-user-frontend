import toast from "react-hot-toast";
import { AxiosClient } from "./axios";
import { go2url, handleResponse } from './net';

export const isLoggedIn = () => {
  return localStorage.getItem('logged_in') === "true";
}

export const signout = () => {
  localStorage.removeItem('logged_in');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_id');
}

export const check_signin = (url) => {
  AxiosClient.post(`/auth/check`)
    .then((resp) => {
      handleResponse(resp,
        null,
        (msg) => {
          console.log(msg);
          signout();
          go2url("/signin?url=" + encodeURIComponent(url));
        });
    })
    .catch((err) => {
      toast.error(err.message);
      signout();
      go2url("/signin?url=" + encodeURIComponent(url));
    });
}
               