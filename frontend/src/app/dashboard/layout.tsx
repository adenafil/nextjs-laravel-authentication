import React from "react";
import { AuthProvider } from "./_components/auth-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">{children}</div>
    </AuthProvider>
  );
}
