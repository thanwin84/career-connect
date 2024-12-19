import { ThemeToggle } from '../../../../../components/ui';
import MenuContainer from '../../../../../components/ui/menu';

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
