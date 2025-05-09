import { SignOutButton } from "@clerk/clerk-react";
import React from "react";
import { LogOut } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { isSignedIn, user } = useUser();

  return (
    <div className="z-60 border-gray-700 top-0 w-64 bg-black h-full absolute left-0 text-white flex flex-col shadow-lg p-6 border-r">
      {/* App Name */}
      <p className="text-white font-bold mb-10 text-lg">Snap Talk Analyser</p>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-6 text-gray-300 divide-gray-700">
        <Link
          to="/"
          className="flex items-center gap-3 hover:scale-105 transform transition-all duration-300 cursor-pointer"
        >
          <span>Home</span>
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-3 hover:scale-105 transform transition-all duration-300 cursor-pointer"
        >
          <span>Dashboard</span>
        </Link>

        <Link
          to="/home"
          className="flex items-center gap-3 hover:scale-105 transform transition-all duration-300 cursor-pointer"
        >
          <span>Analyse</span>
        </Link>
      </nav>

      {isSignedIn && (
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-center gap-3 mb-4 hover:scale-105 transform transition-all duration-300">
            <img
              src={user.imageUrl}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <h2 className="text-lg">{user.firstName}</h2>
          </div>

          <div className="flex items-center gap-2 bg-violet-600 py-2 text-center align-middle justify-center rounded-full hover:bg-violet-700 hover:scale-105 transform transition-all duration-300">
            <LogOut className="w-5 h-5" />
            <SignOutButton className="text-sm hover:underline cursor-pointer">
              Logout
            </SignOutButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
