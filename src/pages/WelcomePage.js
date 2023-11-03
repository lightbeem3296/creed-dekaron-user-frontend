import { LbPageTransition } from "../components/PageTransition";
import { LbParagraph, LbSubTitle, LbTitle } from "../components/Typography";
import { LbContent } from "./layout/Content";

export const WelcomePage = () => {
  return (
    <LbPageTransition>
      <div className="min-h-[20rem] lb-bg-img-banner pt-[25vw] h-[50vw]">
        <div className="px-4 py-2 mx-auto text-sm text-white -skew-x-12 w-fit md:text-lg lg:text-xl lb-color-sel md:px-8 md:py-4 lb-title-font lb-text-shadow">
          <p className="skew-x-12">
            PLAY TO EARN MONEY!
          </p>
        </div>
        <LbTitle className='text-5xl text-white lb-title-font lb-text-shadow sm:text-6xl md:text-7xl lg:text-8xl'>CREED</LbTitle>
      </div>
      <LbContent>
        <div className="max-w-screen-lg py-20 mx-auto">
          <LbSubTitle>
            WELCOME TO CREED-DK
          </LbSubTitle>
          <LbParagraph>
            No mercy for the weak, no pity for the dying, no tears for the slain.
          </LbParagraph>
          <LbParagraph>
            Creed is a MMORPG game as well as play to earn game - you can win $ prizes.
          </LbParagraph>
          <LbParagraph>
            Creed is currently under development for new era.
          </LbParagraph>
          <LbParagraph>
            Free to play.
          </LbParagraph>
          <LbParagraph>
            Awesome 3D graphics.
          </LbParagraph>
          <LbParagraph>
            Dungeons are intended for both groups and solo players.
          </LbParagraph>
          <LbParagraph>
            Recommended for players over the age of 17.
          </LbParagraph>
          <LbParagraph>
            12 character classes including the Bagi Warrior, Azure Knight, Segita Hunter,
          </LbParagraph>
          <LbParagraph>
            Incar Magician, Vicious Summoner,  Segnale, Aloken, Segureaper, Concerra Summoner, Half Bagi, Dark Wizzard, Dragon Knight.
          </LbParagraph>
          <LbParagraph>
            Consensual and nonconsensual PvP.
          </LbParagraph>
          <LbParagraph>
            Observer system where players can watch combat without getting involved.
          </LbParagraph>
          <LbParagraph>
            Fishing helps restore health and mana.
          </LbParagraph>
          <LbParagraph>
            MP3 systems allow players to listen to their own tunes during play.
          </LbParagraph>
          <LbParagraph>
            Earn money by winning tournaments / events.
          </LbParagraph>
          <LbParagraph>
            And much more …
          </LbParagraph>
        </div>
      </LbContent>
    </LbPageTransition>
  );
}
                             