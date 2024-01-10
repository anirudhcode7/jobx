import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Demo from './components/auth/ReactLogin';
import Home from './Home';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './views/Landing';
import SignupPage from './views/Signup';
import Login from './views/Login';
import InterviewPage from './views/Interview';
import ThankYouPage from './views/ThankYouPage';
import {NextUIProvider} from "@nextui-org/react";


function App() {
  return (
  <AuthProvider>
    <NextUIProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<Demo />} />
            <Route path="/home" element={<Home />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
          </Routes>
        </BrowserRouter>
    </NextUIProvider>
    {/* <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8"> */}

      {/* </div>
    </div> */}
  </AuthProvider>
  );
}

export default App;
