import React, { Suspense } from "react";

export default function ProfileLayout({ children }) {
  return <Suspense>{children}</Suspense>;
}
