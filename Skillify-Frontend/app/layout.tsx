"use client";
import "./globals.css";
import Navbar from "../components/Navbar/index";
import Footer from "../components/Footer/index";
import Provider from "@/components/Provider";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <head>
          <title>Skillify</title>
        </head>

        <body>
          <Navbar />
          <Provider>{children}</Provider>
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
