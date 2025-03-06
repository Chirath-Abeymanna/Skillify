"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import Navbar from "../components/Navbar/index";
import Footer from "../components/Footer/index";
import Provider from "@/components/Provider";
import { SessionProvider } from "next-auth/react";
import LoadingScreen from "@/components/Splash";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("overflow-hidden"); // Hide scroll

    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = 4000 - elapsedTime;

      setTimeout(
        () => {
          setIsLoading(false);
          document.body.classList.remove("overflow-hidden"); // Restore scroll
        },
        remainingTime > 0 ? remainingTime : 0
      );
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <SessionProvider>
      <html lang="en">
        <head>
          <title>Skillify</title>
        </head>

        <body>
          {isLoading && <LoadingScreen />}
          <div
            className={`transition-opacity duration-500 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          >
            <Navbar />
            <Provider>{children}</Provider>
            <Footer />
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
