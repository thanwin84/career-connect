import { DashboardProvider } from "../../contexts/dashboardContext";
import LayoutContent from "./LayoutContent";

type Props = {
  className?: string;
  defaultTheme: "light" | "dark";
};

export default function DashboardLayout({ defaultTheme }: Props) {
  return (
    <DashboardProvider defaultTheme={defaultTheme}>
      <LayoutContent />
    </DashboardProvider>
  );
}
