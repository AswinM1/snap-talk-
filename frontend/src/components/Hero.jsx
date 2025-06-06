import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import Features from './Features';
import PricingPage from './Pricing';
import Footer from './Footer';
import Navbar from './Navbar';

function Hero() {
  const parentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, duration: 2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, duration: 2 },
  };

  return (
    <div className=" w-full h-screen"
    style={{
      background:"radial-gradient(circle at top left,blue 1%,#121212 40%)"
    }}>
      <Navbar></Navbar>
      <div className="w-full h-screen flex justify-center items-center px-4 text-center">
        <motion.div
          variants={parentVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col justify-center items-center"
        >
          <motion.h1
            variants={childVariants}
            className="md:text-[80px] text-[44px] font-sans text-neutral-200 tracking-tighter font-bold  md:leading-[85px] "
          >
            Your <span className='  tracking-tighter bg-blue-700  rounded-xl py-2 px-2 '>Snap Talk</span> Ai companion
          </motion.h1>
          <motion.p
            variants={childVariants}
            className="font-medium font-sans tracking-tight md:text-[22px] text-neutral-400 mt-4 max-w-xl"
          >
            Upload your audio, get instant transcriptions, and receive personalized feedbacks
          </motion.p>

          <div className="flex flex-wrap justify-center gap-5 mt-10 ">
            <SignedIn>
              <motion.div variants={childVariants}>
                <Link to="/home">
                  <div className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-4 py-2 rounded-xl">
                    Try Now
                  </div>
                </Link>
              </motion.div>
            </SignedIn>

            <SignedOut>
              <motion.div variants={childVariants}>
                <SignInButton>
                 <div className="bg-blue-600 cursor-pointer text-white hover:bg-blue-500 transition-all duration-300 px-4 py-2 rounded-xl">
                    Try Now
                  </div>
                </SignInButton>
              </motion.div>
            </SignedOut>

            <motion.div variants={childVariants}>
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-600 cursor-pointer text-white  rounded-xl  hover:bg-blue-500 transition font-sans font-medium tracking-tight">
                  Get Started
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

     
black
      <div>
        <Features />
      </div>

      <div> 
        <PricingPage />
      </div>

      <div className='border-t border-neutral-800 py-2 px-2 justify-end flex'>
        <Footer />
      </div>
    </div>
  );
}

export default Hero;
