import { useEffect, useState } from "react";
import { LbPageTransition } from "../../components/PageTransition";
import { LbParagraph } from "../../components/Typography";
import { LbProfilePanel } from "./components/components";
import { LbPaypal } from "./components/payment";
import { handleResponse } from "../../utils/net";
import { AxiosClient } from "../../utils/axios";
import toast from "react-hot-toast";
import classNames from "classnames";

export const ProfileBuyCoinsPage = () => {
  const [data, setData] = useState({});

  const fetchData = () => {
    AxiosClient.post(`/user/profile/overview`, {
      user_id: localStorage.getItem("user_id"),
    })
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

  const donations = [
    {
      donation: 5,
      coins: 600,
      bonus: '0',
    },
    {
      donation: 10,
      coins: 1260,
      bonus: '5',
    },
    {
      donation: 20,
      coins: 2640,
      bonus: '10',
    },
    {
      donation: 25,
      coins: 3450,
      bonus: '15',
    },
    {
      donation: 50,
      coins: 7200,
      bonus: '20',
    },
    {
      donation: 75,
      coins: 11700,
      bonus: '30',
    },
    {
      donation: 100,
      coins: 16800,
      bonus: '40',
    },
    {
      donation: 200,
      coins: 36000,
      bonus: '50',
    },
    {
      donation: 300,
      coins: 57600,
      bonus: '60',
    },
    {
      donation: 500,
      coins: 100000,
      bonus: '66.67',
    },
  ];

  return (
    <LbPageTransition>
      <LbProfilePanel title='Buy Coins' desc={`${data.coins} Coins`} className='mb-10'>
        <div className="mt-4 mb-8 sm:mx-4">
          <table className="w-full max-w-screen-xl mx-auto table-auto">
            <thead>
              <tr key='0' className="bg-black">
                <td key='0' className="p-1 border border-gray-500 sm:p-2"><LbParagraph>Donation Amount</LbParagraph></td>
                <td key='1' className="p-1 border border-gray-500 sm:p-2"><LbParagraph>Coins Amount</LbParagraph></td>
                <td key='2' className="p-1 border border-gray-500 sm:p-2"><LbParagraph>Bonus Included</LbParagraph></td>
                <td key='3' className="p-1 border border-gray-500 sm:p-2"><LbParagraph>Donate</LbParagraph></td>
              </tr>
            </thead>
            <tbody>
              {
                donations.map((donation, index) => (
                  <tr key={index} className={classNames({
                    "bg-black": index % 2 === 1
                  })}>
                    <td className="p-1 border border-gray-500 sm:p-2" key='0'><LbParagraph>{donation.donation} USD</LbParagraph></td>
                    <td className="p-1 border border-gray-500 sm:p-2" key='1'><LbParagraph>{donation.coins} Coins</LbParagraph></td>
                    <td className="p-1 border border-gray-500 sm:p-2" key='2'><LbParagraph>{donation.bonus} %</LbParagraph></td>
                    <td className="p-1 border border-gray-500 sm:p-2" key='3'><LbPaypal donationIndex={index} fetchData={fetchData} /></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </LbProfilePanel>
    </LbPageTransition>
  )
}
              