"use client";
import Navbar from "./Navbar";
import React, { useEffect } from "react";

const Navbarin: React.FC = () => {
  useEffect(() => {
    const debounce = (fn: Function) => {
      let frame: number;

      return (...params: any[]) => {
        if (frame) {
          cancelAnimationFrame(frame);
        }

        frame = requestAnimationFrame(() => {
          fn(...params);
        });
      };
    };

    // Reads out the scroll position and stores it in the data attribute
    // so we can use it in our stylesheets
    const storeScroll = () => {
      document.documentElement.dataset.scroll = window.scrollY.toString();
    };

    // Listen for new scroll events, here we debounce our `storeScroll` function
    document.addEventListener("scroll", debounce(storeScroll), {
      passive: true,
    });

    // Update scroll position for first time
    storeScroll();
  }, []);
  return (
    <div className="w-full ">
      <div className="h-14 sm:h-32 mb-24 lg:mb-0"></div>{" "}
      {/* Spacer for fixed navbar */}
      <Navbar />
    </div>
  );
};

export default Navbarin;
