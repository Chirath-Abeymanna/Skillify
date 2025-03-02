"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const ProfileSection = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="relative flex flex-col sm:flex-row sm:space-x-10 sm:items-center sm:justify-center sm:left-20 lg:left-28">
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-xl font-semibold hidden sm:block md:block">
            Hey <span>{session.user?.name || "User"}</span>
          </h3>
        </div>
        <div className="lg:hidden flex flex-col items-center">
          <h3 className="absolute top-16 text-xl font-semibold ">
            Hey <span>{session.user?.name || "User"}</span>
          </h3>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <img
            src={session.user?.image || "/images/Avatars/Avatar1.svg"}
            alt="avatar pic"
            className="w-20 h-20 rounded-full mb-4 lg:mb-4 "
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="top-5 lg:top-0 relative w-max left-6 lg:left-16 ">
        <div className="flex justify-end space-x-3 lg:space-x-10  font-Inter">
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
