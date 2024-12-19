import { DashboardProvider } from '../contexts/dashboardContext';
import LayoutContent from './components/user-dashboard/LayoutContent';

type Props = {
  className?: string;
  defaultTheme: 'light' | 'dark';
};

export default function DashboardLayout({ defaultTheme }: Props) {
  return (
    <DashboardProvider defaultTheme={defaultTheme}>
      <LayoutContent />
    </DashboardProvider>
  );
}
