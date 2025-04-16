"use client";

// auth
import { AuthGuard } from "@/auth/guard";
// components
import DashboardLayout from "@/layouts/app";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-datepicker/dist/react-datepicker.css";
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
