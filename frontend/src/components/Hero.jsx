import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

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

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '1rem',
    color: 'black',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  };

  return (
    <div
      className="bg-[#121212]"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <motion.div
        variants={parentVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: '900px', width: '100%', padding: '10px' }}
      >
        <motion.h1
          variants={childVariants}
          className="text-[90px] font-sans text-white font-black leading-[85px] tracking-tighter"
        >
         Your Snap talk companion
        </motion.h1>
        <motion.p
          variants={childVariants}
          style={{
            fontSize: '1.2rem',
            color: 'white',
            fontWeight: 'bold',
            lineHeight: '1.6',
            margin: '0 auto',
            width: '700px',
            fontFamily: 'monospace',
            paddingTop: '40px',
          }}
        >
        Tired of bad snap talks,We provide you the snap talk analyser,Your snap talk companion
        </motion.p>

        <div className="flex justify-center gap-5 mt-10">
          <SignedIn>
            <motion.div variants={childVariants}>
              <Link to="/home">
                <button
                  style={buttonStyle}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#ddd')}
                  onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
                >
                  Get Started
                </button>
              </Link>
            </motion.div>
          </SignedIn>

          <SignedOut>
            <motion.div variants={childVariants}>
              <SignInButton>
                <button
                  style={buttonStyle}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#ddd')}
                  onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
                >
                  Sign In
                </button>
              </SignInButton>
            </motion.div>
          </SignedOut>

          <motion.div variants={childVariants}>
            <Link to="/login">
              <button
                style={buttonStyle}
             
             
              >
                Get Started
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;
