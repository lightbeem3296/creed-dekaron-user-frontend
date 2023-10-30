import { Navigate, Route, Routes } from "react-router-dom";
import { MyPageLayout } from "./Layout";
import { LbPageTransition } from "../../components/PageTransition";
import { ProfileItemShopPage } from "./ItemShopPage";
import { ProfileOverviewPage } from "./OverviewPage";
import { ProfileAccountPage } from "./AccountPage";
import { ProfileCharactersPage } from "./CharactersPage";
import { ProfileBuyCoinsPage } from "./BuyCoinsPage";
import { ProfileGiftCoinsPage } from "./GiftCoinsPage";
import { ProfileCreedianLogsPage as ProfileCoinsLogsPage } from "./CoinsLogsPage";

export const profileRouteItems = [
  {
    label: 'OVERVIEW',
    link: 'overview',
    elem: ProfileOverviewPage,
  },
  {
    label: 'ITEM SHOP',
    link: 'item-shop',
    elem: ProfileItemShopPage,
  },
  {
    label: 'ACCOUNT',
    link: 'account',
    elem: ProfileAccountPage,
  },
  {
    label: 'CHARACTERS',
    link: 'characters',
    elem: ProfileCharactersPage,
  },
  {
    label: 'BUY COINS',
    link: 'buy-coins',
    elem: ProfileBuyCoinsPage,
  },
  {
    label: 'GIFT COINS',
    link: 'gift-coins',
    elem: ProfileGiftCoinsPage,
  },
  {
    label: 'COINS LOGS',
    link: 'coins-logs',
    elem: ProfileCoinsLogsPage,
  },
]

export const MyPageRoutes = () => {
  return (
    <LbPageTransition>
      <Routes>
        <Route path='' element={<MyPageLayout />} >
          {profileRouteItems.map((route) => (
            <Route key={route.link} path={route.link} element={<route.elem />} />
          ))}

          <Route path='' element={<Navigate to='overview' />} />
          <Route path='*' element={<Navigate to='overview' />} />
        </Route>
      </Routes>
    </LbPageTransition>
  )
}
            