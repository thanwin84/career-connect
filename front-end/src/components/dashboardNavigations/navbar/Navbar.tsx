import { Logo } from "../../ui";
import SidebardToggle from "./SidebarToggle";
import NavbarActions from "./NavbarActions";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between px-4 py-4 shadow-sm bg-white dark:bg-zinc-800 border-b dark:border-none">
      <SidebardToggle />
      <div>
        <Logo className="lg:hidden w-36" />
        <h1 className="hidden lg:block text-2xl text-slate-700 font-semibold dark:text-white">
          Dashboard
        </h1>
      </div>
      <NavbarActions />
    </nav>
  );
}
