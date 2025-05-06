// components/SignInPage.js
import React from "react";
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#121212]">
      <SignIn ></SignIn>
      </div>
  );
};

export default SignInPage;
