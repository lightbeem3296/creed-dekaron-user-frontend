import { Navigate, Route, Routes } from "react-router-dom";
import { LbMainLayout } from "./layout/Layout";
import { WelcomePage } from "./WelcomePage";
import { AboutPage } from "./AboutPage";
import { DownloadPage } from "./DownloadPage";
import { RankingPage } from "./RankingPage";
import { SigninPage } from "./SigninPage";
import { SignoutPage } from "./SignoutPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { MyPageRoutes } from "./MyPage/MyPageRoutes";
import { DiscordPage } from "./DiscordPage";
import { SignupPage } from "./SignupPage";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { ResetPasswordResultPage } from "./ResetPasswordResultPage";

export const mainRouteItems = [
  {
    label: 'WELCOME',
    link: 'welcome',
    elem: WelcomePage,
  },
  {
    label: 'RANKING',
    link: 'ranking',
    elem: RankingPage,
  },
  {
    label: 'DOWNLOAD',
    link: 'download',
    elem: DownloadPage,
  },
  {
    label: 'DISCORD',
    link: 'discord',
    elem: DiscordPage,
  },
  {
    label: 'MY PAGE',
    link: 'my-page',
    elem: MyPageRoutes,
    subroute: true,
    protected: true,
  },
  {
    label: 'ABOUT',
    link: 'about',
    elem: AboutPage,
  },
  {
    label: 'SIGN IN',
    link: 'signin',
    elem: SigninPage,
    show_on_signed_out: true,
  },
  {
    label: 'SIGN UP',
    link: 'signup',
    elem: SignupPage,
    show_on_signed_out: true,
  },
  {
    label: 'SIGN OUT',
    link: 'signout',
    elem: SignoutPage,
    show_on_signed_in: true,
  },
];

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<LbMainLayout />} >
        {mainRouteItems.map((route) => (
          <Route key={route.link} path={route.link + (route.subroute ? '/*' : '')} element={
            route.protected
              ? <ProtectedRoute><route.elem /></ProtectedRoute>
              : <route.elem />
          } />
        ))}
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/reset-password-result' element={<ResetPasswordResultPage />} />

        <Route path='' element={<Navigate to='welcome' />} />
        <Route path='*' element={<Navigate to='welcome' />} />
      </Route>
    </Routes>
  );
}
                           