import React from 'react';

import NavBar from "../components/core/NavBar.js";
import MainSection from '../components/landing/MainSection.js';
import QuoteSection from '../components/landing/QuoteSection.js';
export default function LandingPage() {

  return (
    <>
      <NavBar />
      <MainSection />
      <QuoteSection />
    </>
  )
}
