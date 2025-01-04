import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

function Hero() {
  const parentVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 2
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 0
    },
    visible: {
      opacity: 1,
      y: 0,
      duration: 2
    },
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black', // Changed to black for text
        textAlign: 'center',
        padding: '20px',
      }}
      className='bg-purple-700' // Purple background color
    >
      <motion.div
        variants={parentVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: '900px',
          width: '100%',
          
          padding: '10px',
        }}
      >
        <motion.h1
          variants={childVariants}
          className="text-[90px] font-sans font-black leading-[85px] tracking-tighter"
        >
          The Snap Talk analyser
        </motion.h1>
        <motion.p
          variants={childVariants}
          style={{
            fontSize: '1.2rem',
            color: 'black',
            fontWeight:'bold',
            lineHeight: '1.6',
            margin: '0 auto',
            width: '700px',
            fontFamily:'monospace',
            paddingTop: '40px'
          }}
        >
          Introducing  the Snap Talk analyser, which analyzes the snap talks you give with the power of AI and provides real-time feedback.
        </motion.p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '30px',
          }}
        >
          <SignedIn>
          <motion.div variants={childVariants}>
            <Link to={"/home"}>
              <button
                style={{
                  padding: '10px 20px',
                  fontSize: '1rem',
                  color: 'white', // Black text color
                  backgroundColor: 'black',  // White background for button
                  border: 'none',
                  borderRadius: '5px',
                
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = '#121212') // Darker background on hover
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = 'black') // Return to original background
                }
              >
                Get Started
              </button>
              </Link>
          
          </motion.div>
              </SignedIn>
          <SignedOut>
            <SignInButton>
          <motion.div variants={childVariants}>
            
              <button
                style={{
                  padding: '10px 20px',
                  fontSize: '1rem',
                  color: 'white', // Black text color
                  backgroundColor: 'black',  // White background for button
                  border: 'none',
                  borderRadius: '5px',
                
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = '#121212') // Darker background on hover
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = 'black') // Return to original background
                }
              >
                Get Started
              </button>
          
          </motion.div>
              </SignInButton>
              </SignedOut>
          <motion.div variants={childVariants}>
            <Link to="/learn-more">
              <button
                style={{
                  padding: '10px 20px',
                
                  color: 'white', // Black text color
                  backgroundColor: 'black', // White background for button
                  border: 'none',

                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = '#121212') // Darker background on hover
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = 'black') // Return to original background
                }
              >
                Learn More
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;
