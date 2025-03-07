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
    const startTime = Date.now();
    const loadingDuration = 4000; // Duration of the loading animation in ms

    // Function to show or hide loading screen
    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = loadingDuration - elapsedTime;

      setTimeout(
        () => {
          setIsLoading(false);
          document.body.classList.remove("overflow-hidden"); // Restore scroll
        },
        remainingTime > 0 ? remainingTime : 0
      );
    };

    // Set overflow hidden until the page finishes loading
    document.body.classList.add("overflow-hidden");

    // If it's the first load, trigger the loading screen
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Cleanup on unmount or re-render
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
