import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import Features from './Features';
import PricingPage from './Pricing';
import Footer from './Footer';

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
  const buttonS = {
    padding: '10px 20px',
    fontSize: '1rem',
    
   
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
    
  };

  return (
    <div>
    <div
      className="bg-gradient-to-b from-black  to-gray-900"
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
       <div className='flex justify-center mb-6'>
  <div className='flex bg-violet-500 cursor-pointer text-white w-[400px] align-middle justify-center text-center px-1 py-2 font-sans font-semibold rounded-2xl shadow-md hover:shadow-violet-800 transition-all duration-300  '>
   
    Welcome to snap talk analyser
  </div>
</div>
        <motion.h1
          variants={childVariants}
         className="text-[90px] font-sans bg-gradient-to-t from-neutral-500 via-neutral-200 to-neutral-50 bg-clip-text text-transparent leading-[85px] tracking-tight font-bold"
        >
        The Snap talk AI Companion
        </motion.h1>
        <motion.p
        className='font-extralight'
          variants={childVariants}
          style={{
            fontSize: '1.2rem',
            color: 'white',
          
            lineHeight: '1.6',
            margin: '0 auto',
            width: '700px',
          
            paddingTop: '40px',
          }}
        >
  Upload your audio, get instant transcriptions, and receive personalized feedback to improve your speaking skills. We got you covered.
        </motion.p>

        <div className="flex justify-center gap-5 mt-10 font-semibold">
          <SignedIn>
            <motion.div variants={childVariants}>
              <Link to="/home">
                <button
                 style={buttonS}
                 className='bg-violet-500 text-white shadow-md hover:shadow-violet-800 transition-all duration-300 px-4 py-2 rounded-lg'
                >
                  Try Now
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
    <div className=' bg-gray-900 text-center pt-10 text-6xl text-white font-sans font-bold tracking-tighters'>How does it work</div>
      <div className='flex  bg-gradient-to-b from-gray-900     to-black '><Features></Features></div>
      <div>
<PricingPage></PricingPage>
      </div>
      <div  className='bg-gradient-to-b from-black to-gray-900'> 
        <Footer></Footer>
      </div>
      </div>
  );
}

export default Hero;
