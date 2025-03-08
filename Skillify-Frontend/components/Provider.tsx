"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";

const Provider = ({
  children,
  session = null,
}: {
  children: ReactNode;
  session?: Session | null;
}) => {
  console.log("Session in Provider:", session);
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
