import { Outlet } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { Separator } from "../ui/separator";

const Layout = () => {
  return (
    <div className="bg-amber-50 dark:bg-slate-900">
      <div className="bg-amber-100 dark:bg-slate-950 flex justify-end p-3">
        <ThemeToggle />
      </div>
      <Separator />
      <Outlet />
    </div>
  );
};

export default Layout;
