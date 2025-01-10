"use client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

export default function Provider({ children, session }) {
  return (
    <SessionProvider session={session}>
      <ToastContainer />
      {children}
    </SessionProvider>
  );
}
