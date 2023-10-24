import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation } from "react-router-dom";
import { isLoggedIn, signout } from "../utils/auth";
import { go2url, handleResponse } from "../utils/net";
import { LbButton } from "../components/Button";
import { LbPageTransition } from "../components/PageTransition";
import { LbParagraph, LbTitle } from "../components/Typography";
import { LbContent } from "./layout/Content";
import { LbInput } from "../components/Input";

export const SigninPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [pending, setPending] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  var destUrl = query.get("url");
  destUrl = destUrl ? destUrl : "/welcome";

  const onUsernameHandler = (e) => {
    setUsername(e.currentTarget.value);

    setUsernameError(false);
    setPasswordError(false);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);

    setUsernameError(false);
    setPasswordError(false);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setUsernameError(false);
    setPasswordError(false);
    signout();
    setPending(true);

    axios.post(`${process.env.REACT_APP_API_URL}/auth/signin`, {
      "username": username,
      "password": password,
    })
      .then((resp) => {
        handleResponse(resp,
          (data) => {
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            localStorage.setItem("logged_in", true);
            localStorage.setItem("user_id", data.acc.user_id);

            go2url(destUrl);
          },
          (msg) => {
            setUsernameError(true);
            setPasswordError(true);
            toast.error(msg);
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      })
      .finally(() => {
        setPending(false);
      });
  }

  return (
    <LbPageTransition>
      {
        isLoggedIn()
          ? <Navigate to={destUrl} />
          : <LbContent className='lb-content-min-size'>
            <div className="mx-auto">
              <LbTitle>
                SIGN IN
              </LbTitle>
            </div>
            <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={onSubmitHandler}>
                <div>
                  <LbParagraph>
                    USERNAME
                  </LbParagraph>
                  <LbInput
                    disabled={pending}
                    placeholder="Username here ..."
                    className="w-full text-base"
                    error={usernameError}
                    required
                    onChange={onUsernameHandler}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <LbParagraph>
                      PASSWORD
                    </LbParagraph>
                  </div>
                  <LbInput
                    disabled={pending}
                    type="password"
                    placeholder="Password here ..."
                    className="w-full text-base"
                    error={passwordError}
                    required
                    onChange={onPasswordHandler}
                  />
                </div>
                <div className="flex justify-end">
                  <Link to='/reset-password' className="text-base sm:text-lg lb-text-font">
                    Forgot password?
                  </Link>
                </div>
                <LbButton
                  disabled={pending}
                  type="submit"
                  className="w-full py-4 text-base"
                >
                  <div className="flex items-center justify-center mx-auto">
                    {
                      pending
                        ? <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        : null
                    }
                    SIGN IN
                  </div>
                </LbButton>
              </form>
            </div>
          </LbContent>
      }
    </LbPageTransition>
  )
}
             