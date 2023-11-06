import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LbPageTransition } from "../components/PageTransition";
import { LbSubTitle, LbTitle } from "../components/Typography";
import { AxiosClient } from "../utils/axios";
import { isValid } from "../utils/basic";
import { handleResponse } from "../utils/net";
import { LbContent } from "./layout/Content";
import classNames from "classnames";

const DksqRow = ({ rank, index }) => {
  return (
    <div key={index} className="flex items-center p-4 space-x-6 text-sm duration-500 border-t border-gray-800/50 lb-text-font md:text-base hover:bg-gray-800/30">
      <div className="text-xl">
        {index + 1}
      </div>
      <img
        className={classNames("rounded-full size-16", {
          'shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_20px_#f00,0_0_10px_#f00,0_0_30px_#f00]': index === 0,
          'shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#ff0,0_0_10px_#ff0,0_0_15px_#ff0]': index === 1,
          'shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_2px_#08f,0_0_10px_#08f,0_0_10px_#08f]': index === 2,
          'border-2 border-gray-700': index > 2,
        })}
        src={`/img/class/${rank.byPCClass}.png`} alt=''
      />
      <div className="w-full">
        <div className="text-lg">
          {rank.character_name}
        </div>
        <div className="grid grid-cols-3 text-gray-600">
          <div></div>
          <div>
            Win: {rank.dwCombatWin}
          </div>
          <div>
            Lose: {rank.dwCombatLose}
          </div>
        </div>
      </div>
    </div>
  );
}

const KillersRow = ({ rank, index }) => {
  return (
    <div key={index} className="flex items-center p-4 space-x-6 text-sm duration-500 border-t border-gray-800/50 lb-text-font md:text-base hover:bg-gray-800/30">
      <div className="text-xl">
        {index + 1}
      </div>
      <img
        className={classNames("rounded-full size-16", {
          'shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_20px_#f00,0_0_10px_#f00,0_0_30px_#f00]': index === 0,
          'shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#ff0,0_0_10px_#ff0,0_0_15px_#ff0]': index === 1,
          'shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_2px_#08f,0_0_10px_#08f,0_0_10px_#08f]': index === 2,
          'border-2 border-gray-700': index > 2,
        })}
        src={`/img/class/${rank.byPCClass}.png`} alt=''
      />
      <div>
        <div className="text-lg">
          {rank.character_Name}
        </div>
        <div className="grid grid-cols-2 text-gray-600">
          <div>
            Kills: {rank.total_kills}
          </div>
          <div>
            Deaths: {rank.total_deaths}
          </div>
        </div>
      </div>
    </div>
  );
}

export const RankingPage = () => {
  const [rankingData, setRankingData] = useState();

  const fetchData = () => {
    AxiosClient.post('/ranking')
      .then((resp) => {
        handleResponse(resp, (data) => {
          setRankingData(data);
        });
      })
      .catch((ex) => {
        toast.error(ex.message);
      });
  }

  useEffect(() => fetchData(), []);

  return (
    <LbPageTransition>
      <LbContent className='lb-content-min-size'>
        <div className="w-full mx-auto max-w-screen-2xl">
          <LbTitle>RANKING</LbTitle>
          <div className="grid grid-cols-1 gap-4 mt-10 lg:grid-cols-2">
            <div className="flex justify-center">
              <div className="max-w-[30rem] w-full">
                <LbSubTitle>TOP TKSQ</LbSubTitle>
                <div className="p-4 rounded-lg shadow-xl bg-black/30 backdrop-blur-sm">
                  <div className="border-b border-gray-800">
                    {isValid(rankingData)
                      ? rankingData.topDKSQ.map((rank, index) =>
                        <DksqRow key={index} rank={rank} index={index} />
                      ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="max-w-[30rem] w-full">
                <LbSubTitle>TOP KILLERS</LbSubTitle>
                <div className="p-4 rounded-lg shadow-xl bg-black/30 backdrop-blur-sm">
                  <div className="border-b border-gray-800">
                    {isValid(rankingData)
                      ? rankingData.topKillers.map((rank, index) =>
                        <KillersRow key={index} rank={rank} index={index} />
                      ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LbContent>
    </LbPageTransition>
  )
}
                        