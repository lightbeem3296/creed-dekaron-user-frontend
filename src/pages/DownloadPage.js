import { LbButton } from "../components/Button";
import { LbPageTransition } from "../components/PageTransition";
import { LbSubTitle, LbTitle } from "../components/Typography";
import { LbContent } from "./layout/Content";

export const DownloadPage = () => {
  return (
    <LbPageTransition>
      <LbContent className='lb-content-min-size'>
        <div className='w-full max-w-screen-lg mx-auto'>
          <LbTitle>DOWNLOAD</LbTitle>
        </div>
        <div className="pt-[5rem]">
          <div className="mx-auto w-fit">
            <LbSubTitle>DOWNLOAD CREED GAME CLIENT</LbSubTitle>
          </div>
          <div className="mx-auto w-fit">
            <a href={process.env.REACT_APP_DOWNLOAD_URL} target="_blank" rel="noreferrer">
              <LbButton>DOWNLOAD NOW</LbButton>
            </a>
          </div>
        </div>
      </LbContent>
    </LbPageTransition>
  )
}
      