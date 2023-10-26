import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LbPageTransition } from "../../components/PageTransition";
import { AxiosClient } from "../../utils/axios";
import { handleResponse } from "../../utils/net";
import { LbCharacterPanel, LbCharacterRow } from "./components/character";
import { LbProfilePanel } from "./components/components";
import { timeStr } from "../../utils/basic";

const Icon = ({ id, open }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export const ProfileCharactersPage = () => {
  const [open, setOpen] = useState(0);
  const [characters, setCharacters] = useState([]);

  const characterClassList = [
    'Azure Knight',
    'Segita Hunter',
    'Incar Magician',
    'Vicious Summoner',
    'Segnale',
    'Bagi Warrior',
    'Aloken',
    'Dragon Knight',
    'Concerra Summoner',
    'Dark Wizzard',
    'Half Bagi',
    'Seguriper',
  ];

  const mapList = [
    'Braiken Castle',
    'North Ares',
    'Norak Cave',
    'Denebe',
    'East Ares',
    'Heihaff',
    'Parca Temple',
    'Loa Castle',
    'North Morte',
    'West Morte',
    'Castor Cave',
    'Frozen Valley of Vegeance',
    'Crespo',
    'Draco Desert',
    'Norak Cave 2nd Fl.',
    'Castor Cave 2nd Fl.',
    'Braiken Castle Underground Prison',
    'Requies Beach',
    'Avalon Island',
    'Python Castle',
    'Tomb of the Black Dragon',
    'Doomed Maze',
    'Undo Stadion',
    'Zenoa Castle',
    'Magic Field of Crack C',
    'Crespos Treasure C',
    'Aquarius',
    'Maze of Conscript',
    'Maze of Conscript',
    'Cave of Abyss',
    'Magic Field of Crack B',
    'Magic Field of Crack A',
    'Crespos Treasure B',
    'Crespos Treasure A',
    'Magic Field of Crack:Depth',
    'Nunvice Temple',
    'Nunvice Temple',
    'Nunvice Temple',
    'transport-ship',
    'Dead Front [Rabble]',
    'Dead Front [Common]',
    'Dead Front [Baron]',
    'Dead Front [Earl]',
    'Dead Front [Duke]',
    'Dead Front [Arc]',
    'Chain of Fire',
    'Acquirai Ruins',
    'Space of Pilgrimage',
    'Quilue Liana',
    'Nest of Cherubim',
    'Morse Yawalai',
    'The Qualines',
    'Karons Transport Ship C',
    'Karons Transport Ship B',
    'Karons Transport Ship A',
    'Karons Transport Ship S',
    'Undo Stadion',
    'Oasis Cartell',
    'Secret Arena in Norak',
    'Helicita Colosseum',
    'Dead Front [Doom]',
    'Braiken Agency',
    'Loa Agency',
    'The Deadlands',
    'Umbars Hangout',
    'Space of Pilgrimage',
    'Mordo Lumbule',
    'Egutt Desert',
    'Egutt Desert Base',
    'Egutt Desert Base 2',
    'Avalon Islands',
    'An Abyss of Crespo',
    'An Abyss of Crespo -I',
    'An Abyss of Crespo -II',
    'An Abyss of Crespo -II',
    'An Abyss of Crespo -IV'
  ];

  const fetchData = () => {
    AxiosClient.post(`/user/profile/characters`)
      .then((resp) => {
        handleResponse(resp,
          (data) => {
            setCharacters(data);
          },
          (msg) => {
            toast.error(msg);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  useEffect(() => fetchData(), []);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <LbPageTransition>
      <LbProfilePanel title='All Characters' className='max-w-2xl mx-auto'>
        {characters.map((character, index) => {
          const key = index + 1;
          return (
            <Accordion key={key} open={open === key} icon={<Icon id={key} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(key)} className="text-sm font-normal text-gray-500 border-gray-600 hover:text-gray-100 sm:px-4 sm:text-base lg:text-lg lb-text-font">
                <div className="flex items-center w-1/2 space-x-4 items-left">
                  <div>
                    {key}
                  </div>
                  <img className="w-10 h-10 border border-gray-500" src={`/img/class/${character.byPCClass}.png`} alt='' />
                  <div className="ml-2 text-sm text-left lg:text-lg lb-text-font">
                    <div>
                      {character.character_name}
                    </div>
                    <div>
                      {characterClassList[character.byPCClass]}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end w-1/2">
                  Level {character.wLevel}
                </div>
              </AccordionHeader>
              <AccordionBody>
                <div className="overflow-auto">
                  <LbCharacterPanel title='GENERAL'>
                    <LbCharacterRow title='Character Name' desc={character.character_name} />
                    <LbCharacterRow title='Class' desc={characterClassList[character.byPCClass]} />
                  </LbCharacterPanel>
                  <LbCharacterPanel title='DIL'>
                    <LbCharacterRow title='Inventory' desc={character.dwMoney} />
                    <LbCharacterRow title='Store' desc={character.dwStoreMoney} />
                    <LbCharacterRow title='Storage' desc={character.dwStorageMoney} />
                  </LbCharacterPanel>
                  <LbCharacterPanel title='STATISTICS'>
                    <LbCharacterRow title='Adv' desc={character.dwAdv} />
                    <LbCharacterRow title='HP' desc={character.nHP} />
                    <LbCharacterRow title='MP' desc={character.nMP} />
                    <LbCharacterRow title='Shield' desc={character.nShield} />
                    <LbCharacterRow title='Str' desc={character.wStr} />
                    <LbCharacterRow title='Dex' desc={character.wDex} />
                    <LbCharacterRow title='Con' desc={character.wCon} />
                    <LbCharacterRow title='Spr' desc={character.wSpr} />
                    <LbCharacterRow title='Unused Stat Points' desc={character.wStatPoint} />
                    <LbCharacterRow title='Unused Skill Points' desc={character.wSkillPoint} />
                    <LbCharacterRow title='Skill Reset' desc={character.bySkillClearCount} />
                    <LbCharacterRow title='Stats Reset' desc={character.byStatClearCount} />
                  </LbCharacterPanel>
                  <LbCharacterPanel title='LEVEL PROGRESS'>
                    <LbCharacterRow title='Current Level' desc={character.wLevel} />
                    <LbCharacterRow title='Current Exp' desc={character.dwExp} />
                  </LbCharacterPanel>
                  <LbCharacterPanel title='PLAYER vs PLAYER'>
                    <LbCharacterRow title='PK Count' desc={character.wPKCount} />
                    <LbCharacterRow title='Win Record' desc={character.wWinRecord} />
                    <LbCharacterRow title='Lose Record' desc={character.wLoseRecord} />
                  </LbCharacterPanel>
                  <LbCharacterPanel title='MAP INFO'>
                    <LbCharacterRow title='Current Camp' desc={mapList[character.wMapIndex] || '#'} />
                    <LbCharacterRow title='Current X' desc={character.wPosX} />
                    <LbCharacterRow title='Current Y' desc={character.wPosY} />
                    <LbCharacterRow title='Return Camp' desc={mapList[character.wRetMapIndex] || '#'} />
                    <LbCharacterRow title='Return X' desc={character.wRetPosX} />
                    <LbCharacterRow title='Return Y' desc={character.wRetPosY} />
                  </LbCharacterPanel>
                  <LbCharacterPanel title='ONLINE'>
                    <LbCharacterRow title='Date Created' desc={timeStr(character.ipt_time)} />
                    <LbCharacterRow title='Login time' desc={timeStr(character.login_time)} />
                    <LbCharacterRow title='Logout time' desc={timeStr(character.logout_time)} />
                    <LbCharacterRow title='IP Address' desc={character.IP || '#'} />
                  </LbCharacterPanel>
                </div>
              </AccordionBody>
            </Accordion>
          );
        })}
      </LbProfilePanel>
    </LbPageTransition>
  )
}
             