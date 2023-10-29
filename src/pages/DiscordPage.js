import { LbButton } from "../components/Button"
import { LbPageTransition } from "../components/PageTransition"
import { LbSubTitle, LbTitle } from "../components/Typography"
import { LbContent } from "./layout/Content"

export const DiscordPage = () => {
  return (
    <LbPageTransition>
      <LbContent className='lb-content-min-size'>
        <div className='w-full max-w-screen-lg mx-auto'>
          <LbTitle>DISCORD</LbTitle>
        </div>
        <div className="pt-[5rem]">
          <div className="mx-auto w-fit">
            <LbSubTitle>ENJOY CREED DISCORD</LbSubTitle>
          </div>
          <div className="mx-auto w-fit">
            <a href={process.env.REACT_APP_DISCORD_URL} target="_blank" rel="noreferrer">
              <LbButton selected='true'>GO TO DISCORD</LbButton>
            </a>
          </div>
        </div>
      </LbContent>
    </LbPageTransition>
  )
}
          