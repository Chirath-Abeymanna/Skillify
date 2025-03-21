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
    <nav className="navbar w-[100vw] fixed top-0 left-0 right-0 z-[9999] bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="relative flex h-20 sm:h-20 items-center justify-between">
          <div className="flex flex-1 items-center sm:justify-between">
            {/* LOGO */}
            <div className="relative lg:right-12 flex flex-shrink-0 items-center justify-start after:content-[''] after:h-12 after:w-[1px] after:bg-gray-200 after:ml-4 after:hidden lg:after:block">
              <Link
                href="/"
                className="w-[150px] lg:w-[230px] relative font-semibold text-black"
              >
                <img
                  src="/images/NavBar/logo.svg"
                  alt=""
                  className="w-[150px] h-[200px] lg:w-[230px]"
                />
              </Link>
              <p className="block "></p>
            </div>

            {/* LINKS */}
            <div className="hidden lg:flex items-center after:content-[''] after:h-12 after:w-[1px] after:bg-gray-200 after:ml-4">
              <div className="flex justify-center space-x-10">
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
                        href="/CareerMap"
                        className="block text-black py-1 px-2 hover:bg-gray-100"
                      >
                        Career Map
                      </Link>
                      <Link
                        href="/JobSeeker"
                        className="block text-black py-1 px-2 hover:bg-gray-100"
                      >
                        Job Seeker
                      </Link>
                      <Link
                        href="/SalaryScope"
                        className="block text-black py-1 px-2 hover:bg-gray-100"
                      >
                        Salary Scope
                      </Link>
                      <Link
                        href="/DegreeMatcher"
                        className="block text-black py-1 px-2 hover:bg-gray-100"
                      >
                        Degree Navigator
                      </Link>
                      <Link
                        href="/TechFit"
                        className="block text-black py-1 px-2 hover:bg-gray-100"
                      >
                        Tech Fitter
                      </Link>
                      <Link
                        href="/WorkStyleMatcher"
                        className="block text-black py-1 px-2 hover:bg-gray-100"
                      >
                        WorkStyle Match
                      </Link>
                      <Link
                        href="/consultation"
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
                  href={"/blogs"}
                  className={`${style.navlinks} ${
                    isActive("/blogs") ? style.active : ""
                  } ${style.underline} relative`}
                >
                  Blogs
                </Link>
                <Link
                  href={"/#joinus-section"}
                  className={`${style.navlinks} ${
                    isActive("/#joinus-section") ? style.active : ""
                  } ${style.underline} relative`}
                >
                  Contact Us
                </Link>
                <Link
                  href={"/HelpCenter"}
                  className={`${style.navlinks} ${
                    isActive("/HelpCenter") ? style.active : ""
                  } ${style.underline} relative`}
                >
                  Help Center
                </Link>
              </div>
            </div>

            {/* PROFILE SECTION (Hidden on Mobile and Tablet, Shown on Larger Screens) */}
            <div className="hidden lg:block">
              <ProfileSection />
            </div>
          </div>

          {/* DRAWER FOR MOBILE AND TABLET VIEW (Shown on Small and Medium Screens) */}
          <div className="block lg:hidden ">
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
