import axios from "axios";
import toast from "react-hot-toast";
import { ERROR_CODE, go2url, handleResponse } from "./net";
import { signout } from "./auth";
import { isInvalid, isValid } from "./basic";

export const AxiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Accept": "application/json",
  },
});

AxiosClient.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");
    if (isValid(access_token)) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

const refresh_access_token = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  try {
    const resp = await AxiosClient.post(`${process.env.REACT_APP_API_URL}/auth/refresh`, { refresh_token });
    if (resp.status === 200) {
      handleResponse(resp,
        (data) => {
          localStorage.setItem("access_token", data.access_token);
        },
        (msg) => {
          toast.error(msg);
        });
    }
  } catch (err) {
    toast.error(err.message);
  }
};

AxiosClient.interceptors.response.use(
  async (resp) => {
    return handleResponse(resp,
      () => {
        return resp;
      },
      async (msg, code) => {
        if (code !== ERROR_CODE.AUTH) {
          return resp;
        } else {
          const orgReq = resp.config;

          if (orgReq.url === `${process.env.REACT_APP_API_URL}/auth/refresh`) {
            signout();
            go2url("/signin?url=" + encodeURIComponent(window.location.pathname));

            return Promise.reject({ message: 'token refresh failed' });
          }

          if (isInvalid(orgReq._retry) && (!orgReq._retry)) {
            orgReq._retry = true;
            await refresh_access_token();
            return AxiosClient(orgReq);
          }

          return Promise.reject({ message: msg });
        }
      });
  },
  (err) => {
    toast.error(err.message);
  }
);
        