import { useEffect, useState } from "react";
import { LbPageTransition } from "../../components/PageTransition";
import { AxiosClient } from "../../utils/axios";
import { LbProfilePanel, LbPropsDesc, LbPropsContainer } from "./components/components";
import { handleResponse } from "../../utils/net";
import toast from "react-hot-toast";
import { timeStr } from "../../utils/basic";

export const ProfileOverviewPage = () => {
  const [data, setData] = useState({});

  const fetchData = () => {
    AxiosClient.post(`/user/profile/overview`)
      .then((resp) => {
        handleResponse(resp, (data) => {
          setData(data);
        });
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  useEffect(() => fetchData(), []);

  return (
    <LbPageTransition>
      <LbProfilePanel title='Account Overview' className='max-w-xl'>
        <LbPropsContainer devide={true}>
          <LbPropsDesc title='Username' desc={data.user_id} className='py-4' />
          <LbPropsDesc title='Email' desc={data.user_mail} className='py-4' />
          <LbPropsDesc title='Characters' desc={data.characters} className='py-4' />
          <LbPropsDesc title='Registered On' desc={timeStr(data.registered_on)} className='py-4' />
          <LbPropsDesc title='Coins' desc={data.coins} className='py-4' />
          <LbPropsDesc title='Creedians' desc={data.creedians} className='py-4' />
        </LbPropsContainer>
      </LbProfilePanel>
    </LbPageTransition>
  )
}
   