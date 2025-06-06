import { SignOutButton } from "@clerk/clerk-react";
import React, { useState } from "react";
import { LogOut, Menu } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { isSignedIn, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button - only visible on small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`z-40 fixed top-0 left-0 h-full w-64 bg-[#121212] border-r border-neutral-800 py-10 px-10 text-white flex flex-col gap-10 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex`}
      >
        <nav className="flex flex-col gap-6 text-gray-300">
          <Link
            to="/"
            className="flex items-center gap-3 hover:scale-105 transform transition-all duration-300"
          >
            <span>Home</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-3 hover:scale-105 transform transition-all duration-300"
          >
            <span>Dashboard</span>
          </Link>
          <Link
            to="/home"
            className="flex items-center gap-3 hover:scale-105 transform transition-all duration-300"
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

            <div className="flex items-center gap-2 bg-blue-500 py-2 justify-center rounded-xl hover:bg-blue-700 transition-all duration-300">
              <LogOut className="w-5 h-5" />
              <SignOutButton className="text-sm cursor-pointer">
                Logout
              </SignOutButton>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
