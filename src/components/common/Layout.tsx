import React from "react";
import { Outlet } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { Separator } from "../ui/separator";

const Layout = () => {
  return (
    <div>
      <div className="flex justify-end p-3">
        <ThemeToggle />
      </div>
      <Separator />
      <Outlet />
    </div>
  );
};

export default Layout;
