import React, { useEffect } from 'react';

import Nav from "../components/core/Nav"
import MainSection from '../components/landing/MainSection.js';
import QuoteSection from '../components/landing/QuoteSection.js';
import { useAuth } from '../context/AuthContext.js'
export default function LandingPage() {
  var { authToken, setToken } = useAuth();

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
  }); // add dependency array for authToken and setToken if required

  return (
    <>
     <div className='main'>
          <div className='gradient' />
      </div>
      <Nav isLandingPage={true} />
      <MainSection />
      {/* <QuoteSection /> */}
    </>
  )
}
