import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'; // Correct import for routing
import Home from './components/Home';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Contact from './components/Contact';
import { SignedIn } from '@clerk/clerk-react';
// import Features from './components/Features';

function App() {
  return (
    <div>
     
       
     
            <Navbar />
            <Routes>
              <Route path="/home" element={<SignedIn><Home /></SignedIn>} />
             
              <Route path="/" element={<Hero />} />
            
              <Route path="/contact" element={<Contact />} />
          
            </Routes>
         
        
      
    </div>
  );
}

export default App;
