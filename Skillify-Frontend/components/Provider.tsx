"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";

const Provider = ({
  children,
  session = null, // ✅ Make session optional by setting a default value
}: {
  children: ReactNode;
  session?: Session | null;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
