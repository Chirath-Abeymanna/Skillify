"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileSection from "./ProfileSection";
import { signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "#", dropdown: true },
  { name: "FAQ", href: "/#faq-section" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact Us", href: "/#joinUs-section" },
];

const services = [
  { name: "Career Map", href: "/CareerMap" },
  { name: "Job Seeker", href: "/JobSeeker" },
  { name: "Salary Scope", href: "/SalaryPredictor" },
  { name: "Degree Navigator", href: "/DegreeMatcher" },
  { name: "Consultation", href: "/consultation" },
];

interface DataProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Drawerdata = ({ setIsOpen }: DataProps) => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status } = useSession();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target && !(event.target as Element).closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="rounded-md max-w-sm w-full mx-auto">
      <div className="">
        <ProfileSection />
      </div>
      <div className="flex-1 mt-8">
        <div className="sm:block">
          <div className="flex flex-col space-y-6 px-5 pt-2 pb-3">
            {navigation.map((item) =>
              item.dropdown ? (
                <div className="relative dropdown" key={item.name}>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevents unwanted navigation
                      setDropdownOpen(!dropdownOpen);
                    }}
                    className={`w-full text-left py-2 px-4 rounded-md text-base font-medium transition duration-300 ${
                      dropdownOpen
                        ? "bg-[#00224A] text-white"
                        : "text-black hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
                      {services.map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-500 hover:text-white"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setIsOpen(false); // Close drawer when clicking a main link
                  }}
                  className={`w-full text-left py-2 px-4 rounded-md text-base font-medium transition duration-300 ${
                    pathname === item.href
                      ? "bg-[#00224A] text-white"
                      : "text-black hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}

            {status === "authenticated" && session && (
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
                className="flex justify-center w-[80%] text-center px-4 py-2 bg-red-500  text-white hover:bg-red-700 rounded-lg ml-5 space-x-5"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="mt-1" />
                <p>Log Out</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawerdata;
