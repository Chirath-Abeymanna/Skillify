"use client";

import { useSession, signOut, SessionProvider } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

declare module "next-auth" {
  interface Session {
    user: {
      firstName?: string | null;
      lastName?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      avatar?: string | null;
      provider?: string | null;
      reviews?: string[] | null;
      starNo?: number | null;
    };
  }
}

const ProfileSection = () => {
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  let userAvatar: string;
  const { data: session, status } = useSession();

  console.log("user", session?.user);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  session?.user.firstName;

  if (status === "authenticated" && session) {
    userAvatar = "/images/avatars/" + session.user.avatar + ".svg";
    return (
      <div className="relative flex flex-col items-center sm:items-center sm:space-x-10 sm:justify-center lg:left-24 lg:space-x-10 lg:w-[17vw] lg:justify-between">
        <div className="flex flex-col lg:flex-row lg:space-x-10 items-center sm:items-center">
          <div className="hidden lg:flex flex-col items-center">
            <h3 className="text-xl font-semibold">
              Hey <span>{session.user?.firstName || "User"}</span>
            </h3>
          </div>
          <div className="relative lg:block hidden" ref={dropdownRef}>
            <img
              src={userAvatar}
              alt="avatar pic"
              className="w-16 h-16 lg:relative sm:w-20 sm:h-20 lg:w-28 lg:h-28 lg:top-3 rounded-full mb-4 lg:mb-4 cursor-pointer"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            />
            {dropdownVisible && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-28 right-0  w-48 bg-white border border-gray-200 rounded-sm shadow-lg z-50 pb-2 space-y-5"
              >
                <Link
                  href="/Profile"
                  className="block ml-2 w-[90%] px-4 py-2 mt-5 text-center bg-btnblue text-white hover:bg-[#2969a0] rounded-md"
                >
                  Manage account
                </Link>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex justify-center w-[90%] text-center px-4 py-2 bg-red-500  text-white hover:bg-red-700 rounded-md ml-2  space-x-5"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} className="mt-1" />
                  <p>Log Out</p>
                </button>
              </motion.div>
            )}
          </div>
          <div className="lg:hidden flex flex-col items-center">
            <img
              src={userAvatar}
              alt="avatar pic"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 lg:mb-4 cursor-pointer"
              onClick={() => router.push("/Profile")}
            />
          </div>
        </div>
        <div className="lg:hidden flex flex-col items-center">
          <h3 className="text-xl font-semibold">
            Hey <span>{session.user?.firstName || "User"}</span>
          </h3>
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative w-max left-6 lg:left-16">
        <div className="flex justify-end space-x-3 lg:space-x-10 font-Inter">
          <Link
            href={"/SignIn"}
            className="relative top-2 text-lg transition-all duration-500 ease-in-out after:absolute after:left-0 after:bottom-1 after:w-0 after:h-[8%] after:rounded-full after:bg-black after:transition-all after:duration-500 hover:after:w-full"
          >
            Sign In
          </Link>
          <Link
            href={"/SignUp"}
            className="px-5 py-2 bg-[#00224A] text-white rounded-full hover:bg-[#0f1c2a]"
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
};

export default ProfileSection;
