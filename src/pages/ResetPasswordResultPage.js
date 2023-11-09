import { useLocation } from "react-router-dom"
import { LbButton } from "../components/Button"
import { LbPageTransition } from "../components/PageTransition"
import { LbTitle } from "../components/Typography"
import { LbContent } from "./layout/Content"
import { useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { handleResponse } from "../utils/net"

export const ResetPasswordResultPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  var token = query.get("token");

  useEffect(() => {
    console.log(token);
    axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password?token=${token}`)
      .then((resp) => {
        handleResponse(resp, (_) => {
          toast.success('Password reset is done.');
        });
      })
      .catch((ex) => {
        toast.error(ex.message);
      });
  }, []);

  return (
    <LbPageTransition>
      <LbContent className='lb-content-min-size'>
        <div className='w-full max-w-screen-lg mx-auto'>
          <LbTitle>RESET PASSWORD</LbTitle>
        </div>
        <div className="pt-[5rem]">
          <div className="mx-auto w-fit">
            <a href='/signin' target="_self" rel="noreferrer">
              <LbButton selected='true'>GO TO SIGNIN PAGE</LbButton>
            </a>
          </div>
        </div>
      </LbContent>
    </LbPageTransition>
  )
}
                      