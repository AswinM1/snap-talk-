import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react'; // Hamburger and close icons

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  return (
    <nav className="text-black shadow-lg rounded-xl max-w-4xl mx-auto font-sans  z-10">
      <div className="px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="cursor-pointer">
              <p className="w-7 h-7 flex items-center justify-center bg-yellow-200 rounded-full font-black text-black">
                S
              </p>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-white hover:text-neutral-200 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
            >
              Home
            </Link>
            <Link
              to="/home"
              className="bg-blue-500 rounded-xl text-black px-4 py-2 text-sm font-medium transition duration-150 ease-in-out"
            >
              Try Now
            </Link>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button className="text-white hover:text-neutral-300 px-3 py-2 rounded-md text-sm font-medium">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 z-10">
          <Link
            to="/"
            className="block text-white hover:text-neutral-200 px-3 py-2 rounded-md text-sm font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/home"
            className="block bg-blue-500 rounded-xl text-black px-4 py-2 text-sm font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Try Now
          </Link>
          <SignedIn>
            <div className="pt-2">
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button
                className="block text-white hover:text-neutral-300 px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
