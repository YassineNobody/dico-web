import type { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Layout: FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className={isHome ? "min-h-screen bg-black": "min-h-screen bg-white dark:bg-blue-950 flex flex-col"}>
      <Navbar />
      <main className="flex-1 text-black flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
