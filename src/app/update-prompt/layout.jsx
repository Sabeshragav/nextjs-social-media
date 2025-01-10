import React, { Suspense } from "react";

export default function UpdatePromptLayout({ children }) {
  return <Suspense>{children}</Suspense>;
}
