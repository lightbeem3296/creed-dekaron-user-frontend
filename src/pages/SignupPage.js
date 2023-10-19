import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { LbButton } from "../components/Button";
import { LbInput } from "../components/Input";
import { LbPageTransition } from "../components/PageTransition";
import { LbParagraph, LbTitle } from "../components/Typography";
import { go2url, handleResponse } from "../utils/net";
import { LbContent } from "./layout/Content";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);
  const [pending, setPending] = useState(false);

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);

    setEmailError(false);
    setUsernameError(false);
    setPasswordError(false);
    setPassword2Error(false);
  };

  const onUsernameHandler = (e) => {
    setUsername(e.currentTarget.value);

    setEmailError(false);
    setUsernameError(false);
    setPasswordError(false);
    setPassword2Error(false);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);

    setEmailError(false);
    setUsernameError(false);
    setPasswordError(false);
    setPassword2Error(false);
  }
  const onPassword2Handler = (e) => {
    setPassword2(e.currentTarget.value);

    setEmailError(false);
    setUsernameError(false);
    setPasswordError(false);
    setPassword2Error(false);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setPasswordError(true);
      setPassword2Error(true);
      toast.error("The password and confirmation do not match");
      return;
    }

    let user_captcha = document.getElementById('user_captcha_input').value;
    if (validateCaptcha(user_captcha) !== true) {
      toast.error('Captcha Does Not Match');
      document.getElementById('user_captcha_input').value = "";
      return;
    }

    setEmailError(false);
    setUsernameError(false);
    setPasswordError(false);
    setPassword2Error(false);

    setPending(true);

    axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
      "email": email,
      "username": username,
      "password": password,
    })
      .then((resp) => {
        handleResponse(resp,
          (_) => {
            go2url('/signin');
          },
          (msg) => {
            setEmailError(true);
            setUsernameError(true);
            setPasswordError(true);
            setPassword2Error(true);
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

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  return (
    <LbPageTransition>
      <LbContent className='lb-content-min-size'>
        <div className="mx-auto">
          <LbTitle>
            SIGN UP
          </LbTitle>
        </div>
        <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmitHandler}>
            <div>
              <LbParagraph>
                Email
              </LbParagraph>
              <LbInput
                disabled={pending}
                placeholder="Email here ..."
                className="w-full text-base"
                error={emailError}
                required
                type='email'
                onChange={onEmailHandler}
              />
            </div>
            <div>
              <LbParagraph>
                Username
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
                  Password
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
            <div>
              <LbInput
                disabled={pending}
                type="password"
                placeholder="Confirm password here ..."
                className="w-full text-base"
                error={password2Error}
                required
                onChange={onPassword2Handler}
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <LbParagraph>
                  Captcha
                </LbParagraph>
              </div>
              <div className="flex mt-0 space-x-4">
                <LoadCanvasTemplate
                  reloadColor='white'
                  reloadText='[Reload Captcha]'
                />
                <div className="grow">
                  <LbInput
                    className='w-full'
                    placeholder="Enter Captcha Value"
                    id="user_captcha_input"
                    name="user_captcha_input"
                    required
                    type="text"
                  />
                </div>
              </div>
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
                SIGN UP
              </div>
            </LbButton>
          </form>
        </div>
      </LbContent>
    </LbPageTransition>
  )
}
   