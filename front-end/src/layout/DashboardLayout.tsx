import { DashboardProvider } from '../contexts/dashboardContext';
import LayoutContent from './components/user-dashboard/LayoutContent';

export default function DashboardLayout() {
  return (
    <DashboardProvider>
      <LayoutContent />
    </DashboardProvider>
  );
}
