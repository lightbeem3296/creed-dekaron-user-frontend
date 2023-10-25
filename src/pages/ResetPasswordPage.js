import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { handleResponse } from "../utils/net";
import { LbButton } from "../components/Button";
import { LbPageTransition } from "../components/PageTransition";
import { LbParagraph, LbTitle } from "../components/Typography";
import { LbContent } from "./layout/Content";
import { LbInput } from "../components/Input";

export const ResetPasswordPage = () => {
  const [username, setUsername] = useState("");
  const [emil, setEmail] = useState("");
  const [pending, setPending] = useState(false);

  const onUsernameHandler = (e) => {
    setUsername(e.currentTarget.value);
  };
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setPending(true);
    axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password-request`, {
      "username": username,
      "email": emil,
    })
      .then((resp) => {
        handleResponse(resp,
          (_) => {
            toast.success('Password reset link is sent to your email account.');
          },
          (msg) => {
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
      <LbContent className='lb-content-min-size'>
        <div className="mx-auto">
          <LbTitle>
            RESET PASSWORD
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
                required
                onChange={onUsernameHandler}
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <LbParagraph>
                  EMAIL
                </LbParagraph>
              </div>
              <LbInput
                disabled={pending}
                type="email"
                placeholder="Email here ..."
                className="w-full text-base"
                required
                onChange={onEmailHandler}
              />
            </div>
            <div>
              <LbParagraph>
                Reset your login password here.<br />
                After submission, a password reset link will be sent to your email account.<br />
                <span className="text-red-500">Check your spam folder too.</span>
              </LbParagraph>
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
                SUBMIT
              </div>
            </LbButton>
          </form>
        </div>
      </LbContent>
    </LbPageTransition>
  )
}
           