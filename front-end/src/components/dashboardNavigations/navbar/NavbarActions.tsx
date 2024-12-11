import { ThemeToggle } from "../../ui";
import MenuContainer from "../../ui/menu";

type Props = {
  className?: string;
};

export default function NavbarActions({ className }: Props) {
  return (
    <div className={`flex gap-4 ${className}`}>
      <ThemeToggle />
      <MenuContainer />
    </div>
  );
}
