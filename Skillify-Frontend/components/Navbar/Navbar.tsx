"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import ProfileSection from "./ProfileSection"; // Updated import
import style from "./css/Navbar.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="navbar z-[9999]">
      <div className="mx-auto max-w-7xl p-3 md:p-4 lg:px-8">
        <div className="relative flex h-12 sm:h-20 items-center">
          <div className="flex flex-1 items-center sm:justify-between">
            {/* LOGO */}
            <div className="flex flex-shrink-0 items-center border-right">
              <Link
                href="/"
                className="text-2xl sm:text-4xl font-semibold text-black"
              >
                SKILLIFY
              </Link>
            </div>

            {/* LINKS */}
            <div className="hidden lg:flex items-center border-right">
              <div className="flex justify-end space-x-4">
                <Link
                  href={"/#banner-section"}
                  className={`${style.navlinks} ${
                    isActive("/") ? style.active : ""
                  } ${style.underline} relative`}
                >
                  Home
                </Link>

                {/* SERVICES BUTTON WITH DROPDOWN (on Hover) */}
                <div
                  className="relative"
                  onMouseEnter={() => setDropdownVisible(true)}
                  onMouseLeave={() => setDropdownVisible(false)}
                >
                  <button
                    className={`${style.navlinks} ${
                      isActive("#") ? style.active : ""
                    } ${style.underline} relative`}
                  >
                    Services
                  </button>
                  {dropdownVisible && (
                    <div className="absolute z-[9999] bg-white shadow-md mt-[0.1rem] p-3 rounded-md w-48 space-y-5">
                      <Link
                        href="/pages/RoadMap"
                        className="block text-black py-1 px-2 hover:bg-gray-100"
                      >
                        Dynamic Roadmap
                      </Link>
                      <Link
                        href="/pages/JobSeeker"
                        className="block text-black py-1 px-2 hover:bg-gray-100"
                      >
                        Job Seeker
                      </Link>
                      <Link
                        href="/pages/DegreeMatcher"
                        className="block text-black py-1 px-2 hover:bg-gray-100"
                      >
                        Degree Matcher
                      </Link>
                      <Link
                        href="/pages/consultation"
                        className="block text-black py-1 px-2 hover:bg-gray-100"
                      >
                        Consultations
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href={"/#faq-section"}
                  className={`${style.navlinks} ${
                    isActive("/#faq-section") ? style.active : ""
                  } ${style.underline} relative`}
                >
                  FAQ
                </Link>
                <Link
                  href={"/#joinus-section"}
                  className={`${style.navlinks} ${
                    isActive("/#joinus-section") ? style.active : ""
                  } ${style.underline} relative`}
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* PROFILE SECTION (Hidden on Mobile, Shown on Larger Screens) */}
            <div className="hidden sm:block">
              <ProfileSection />
            </div>
          </div>

          {/* DRAWER FOR MOBILE VIEW (Shown on Small Screens) */}
          <div className="block sm:hidden">
            <Bars3Icon
              className="block h-6 w-6"
              aria-hidden="true"
              onClick={() => setIsOpen(true)}
            />
          </div>

          {/* DRAWER LINKS DATA */}
          <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <Drawerdata setIsOpen={setIsOpen} />
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
