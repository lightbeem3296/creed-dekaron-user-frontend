import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { LbNavbar } from "./Navbar";
import { LbFooter } from "./Footer";

export const LbMainLayout = () => {
  return (
    <Layout className="bg-black">
      <LbNavbar />
      <Outlet />
      <LbFooter />
    </Layout>
  );
}
       