import React, { useEffect } from 'react';

import NavBar from "../components/core/NavBar.js";
import MainSection from '../components/landing/MainSection.js';
import QuoteSection from '../components/landing/QuoteSection.js';
import { useAuth } from '../context/AuthContext.js'
export default function LandingPage() {
  var { authToken, setToken, userInfo } = useAuth();

  useEffect(() => {
    // If there is no authToken in the context, retrieve it from localStorage
    console.log("inside use effect")
    if (!authToken) {
      const storedAuthToken = localStorage.getItem('authToken');
      if (storedAuthToken) {
        setToken(storedAuthToken);
      } else {
        return;
      }
    }
  }, []);

  return (
    <>
     <div className='main'>
          <div className='gradient' />
      </div>
      <NavBar />
      <MainSection />
      {/* <QuoteSection /> */}
    </>
  )
}
