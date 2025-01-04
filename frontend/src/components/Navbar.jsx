import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bg1 from '../assets/bg.svg';
import { SignedIn, UserButton, SignedOut, SignInButton } from '@clerk/clerk-react';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className=" text-black shadow-lg rounded-lg mx-4">
      <div className="max-w-4xl mx-auto mt-2 px-4 sm:px-6 lg:px-8 border border-gray-400 rounded-full bg-[#121212]">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img src={bg1} className="h-8 w-auto" alt="Logo" />
            </Link>
              <p className='text-neutral-300 font-sans font-bold px-4'>Snap talk analyser</p>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="text-white hover:text-neutral-200 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
            >
              Home
            </Link>

            {/* Desktop Sign In logic */}
            <SignedIn>
              <UserButton>
                <div className="bg-white text-black hover:bg-neutral-200 px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                  Hello user
                </div>
              </UserButton>
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <div className="bg-white text-black hover:bg-neutral-200 px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                  Sign in
                </div>
              </SignInButton>
            </SignedOut>

            <Link
              to="/home"
              className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
            >
              Try Now
            </Link>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-white hover:bg-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium text-center"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="text-white hover:bg-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium text-center"
            >
              Contact
            </Link>

            {/* Mobile Sign In logic */}
            <SignedIn>
              <UserButton>
                <div className="bg-white text-black hover:bg-neutral-200 block px-3 py-2 rounded-md text-base font-medium text-center">
                  Hello user
                </div>
              </UserButton>
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <div className="bg-white text-black hover:bg-neutral-200 block px-3 py-2 rounded-md text-base font-medium text-center">
                  Sign in
                </div>
              </SignInButton>
            </SignedOut>

            <Link
              to="/home"
              className="bg-gradient-to-r from-purple-700 to-purple-400 text-white block px-3 py-2 rounded-md text-base font-medium text-center"
            >
              Try Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
