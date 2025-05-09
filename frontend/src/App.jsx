import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Contact from './components/Contact';
import { SignedIn, SignInButton, useUser,SignIn } from '@clerk/clerk-react';
import SignInPage from './components/signin';
import Profile from './components/Profile';

function App() {
 
  const { isSignedIn,user} = useUser();
  console.log(user)

  return (
    <div>
      <Navbar />

      {isSignedIn ? (
        <Routes>
           <Route path='/login' element={<Hero/>}></Route>
           <Route path='/profile' element={<Profile/>}></Route>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Hero />} />
          <Route path="/contact" element={<Contact />} />
          
        </Routes>
      ) : (
        <Routes>
          <Route path='/login' element={<SignInPage/>}></Route>
          <Route path='/profile' element={<SignInPage/>}></Route>
          <Route path="/home" element={<SignInPage/>} />
          <Route path="/" element={<Hero />} />
          <Route path="/contact" element={<SignInPage/>} />
          <Route path="/home" element={<SignInPage/>} />
          <Route path="/" element={<Hero />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

      )}
      <Routes>
        <Route path="*" element="page not found" />
      </Routes>
    </div>
  );
}

export default App;
