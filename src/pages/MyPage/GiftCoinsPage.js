import { useEffect, useState } from "react";
import { LbPageTransition } from "../../components/PageTransition";
import { LbProfilePanel } from "./components/components";
import toast from "react-hot-toast";
import { handleResponse } from "../../utils/net";
import { AxiosClient } from "../../utils/axios";
import { LbInputWithLabel } from "../../components/Input";
import { LbButton } from "../../components/Button";

export const ProfileGiftCoinsPage = () => {
  const [coins, setCoins] = useState({});
  const [toCharacterName, setToCharacterName] = useState('');
  const [giftCoins, setGiftCoins] = useState('');

  const fetchData = () => {
    AxiosClient.post(`/user/profile/overview`)
      .then((resp) => {
        handleResponse(resp, (data) => {
          setCoins(data.coins);
        });
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  useEffect(() => fetchData(), []);

  const onChangeCharacterName = (e) => {
    setToCharacterName(e.target.value);
  }

  const onChangeGiftCoins = (e) => {
    setGiftCoins(e.target.value);
  }

  const onSubmitGiftCoins = (e) => {
    e.preventDefault();

    AxiosClient.post(`/user/profile/gift-coins`, {
      to_character_name: toCharacterName,
      gift_coins: giftCoins,
    })
      .then((resp) => {
        handleResponse(resp, (data) => {
          toast.success('Success coins gift.');
          fetchData();
        });
      })
      .catch((ex) => {
        toast.error(ex.message);
      })
  }

  return (
    <LbPageTransition>
      <LbProfilePanel title='Gift Coins' desc={`${coins} Coins`}>
        <form className="flex flex-col space-y-4 max-w-[20rem] p-4 border border-gray-800 rounded-lg mt-4 backdrop-blur-sm" onSubmit={onSubmitGiftCoins}>
        <LbInputWithLabel label='Character Name' placeholder='Input character name here' required onChange={onChangeCharacterName} />
          <LbInputWithLabel label='Coins' placeholder='Input gift coins amount here' type='number' min={1} max={coins} required onChange={onChangeGiftCoins} />
          <LbButton type='submit' className='w-[10rem]'>GIFT COINS</LbButton>
        </form>
      </LbProfilePanel>
    </LbPageTransition>
  )
}
  