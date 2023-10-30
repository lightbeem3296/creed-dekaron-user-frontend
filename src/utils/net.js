import toast from "react-hot-toast";
import { isValid } from './basic';

export const ERROR_CODE = {
  NORMAL: 0,
  AUTH: 1,
};


export const handleResponse = (axios_response, success_callback, error_callback) => {
  let data = axios_response.data;
  if (data.ok === true) {
    if (isValid(success_callback)) {
      return success_callback(data.data);
    }
  } else if (data.ok === false) {
    if (isValid(error_callback)) {
      return error_callback(data.msg, data.code);
    } else {
      toast.error(data.msg);
    }
  } else {
    console.log('unhandled error');
  }
  return null;
}

export const go2url = (url_str) => {
  window.location.href = url_str;
}
                  