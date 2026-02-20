import MainContent from "@/layout/MainContent";
import { Outlet } from "react-router-dom";
import Sidebar from "@/layout/Sidebar";

const Layout = () => {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  );
};

export default Layout;