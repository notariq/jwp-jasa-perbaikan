import type { Metadata } from "next";
import TopBar from "./components/TopBar";

export const metadata: Metadata = {
  title: "Dashbaord",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4 m-4">
      <TopBar />
      {children}
    </div>
  );
}
