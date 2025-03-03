"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const GoogleSignInButton = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => signIn("google")}
        className="p-2 w-12 h-12 border rounded hover:bg-gray-100 transition duration-300"
      >
        <img src="/images/Signup_and_Signin/google.svg" alt="Google Sign In" />
      </button>
    </div>
  );
};

export default GoogleSignInButton;
