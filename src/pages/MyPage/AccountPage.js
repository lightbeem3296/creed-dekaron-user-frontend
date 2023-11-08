import { useState } from "react";
import toast from "react-hot-toast";
import { LbButton } from "../../components/Button";
import { LbInputWithLabel } from "../../components/Input";
import { LbPageTransition } from "../../components/PageTransition";
import { AxiosClient } from "../../utils/axios";
import { handleResponse } from "../../utils/net";
import { LbProfilePanel, LbPropsContainer } from "./components/components";

export const ProfileAccountPage = () => {
  const [newPwd, setNewPwd] = useState('')
  const [confPwd, setConfPwd] = useState('')
  const [email, setEmmail] = useState('');


  const handleNewPwdChange = (e) => {
    setNewPwd(e.currentTarget.value);
  }

  const handleConfPwdChange = (e) => {
    setConfPwd(e.currentTarget.value);
  }

  const handleEmailChange = (e) => {
    setEmmail(e.currentTarget.value);
  }

  const onSubmitChangePasswordHandler = (e) => {
    e.preventDefault();

    if (newPwd !== confPwd) return toast.error('New password and confirm password do not match');

    AxiosClient.post('/user/profile/change-pwd', {
      password: newPwd,
    })
      .then((resp) => {
        handleResponse(resp,
          () => {
            toast.success('Your password has been changed successfully');
          },
          (msg) => {
            toast.error(msg);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  const onSubmitChangeEmailHandler = (e) => {
    e.preventDefault();

    AxiosClient.post('/user/profile/change-email', {
      email: email,
    })
      .then((resp) => {
        handleResponse(resp,
          () => {
            toast.success('Your email has been changed successfully');
          },
          (msg) => {
            toast.error(msg);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <LbPageTransition>
      <LbProfilePanel title='Account Settings' className='flex flex-col max-w-xl py-4 space-y-4'>
        <form onSubmit={onSubmitChangePasswordHandler}>
          <LbPropsContainer className='flex flex-col p-4 space-y-4 border border-gray-700 rounded-lg max-w-80'>
            <LbInputWithLabel label='New Password' type='password' required onChange={handleNewPwdChange} />
            <LbInputWithLabel label='Confirm Password' type='password' required onChange={handleConfPwdChange} />
            <LbButton type='submit' className='max-w-36'>CHANGE PASSWORD</LbButton>
          </LbPropsContainer>
        </form>
        <form onSubmit={onSubmitChangeEmailHandler}>
          <LbPropsContainer className='flex flex-col p-4 space-y-4 border border-gray-700 rounded-lg max-w-80'>
            <LbInputWithLabel label='Email' type='email' required onChange={handleEmailChange} />
            <LbButton type='submit' className='max-w-36'>CHANGE EMAIL</LbButton>
          </LbPropsContainer>
        </form>
      </LbProfilePanel>
    </LbPageTransition>
  );
}
                              