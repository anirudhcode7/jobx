import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Demo from './components/auth/ReactLogin';
import Home from './Home';
import { AuthProvider } from './context/AuthContext';

import SignupPage from './views/Signup';
import LoginPage from './views/Login';
import InterviewPage from './views/Interview';

function App() {
  return (
  <AuthProvider>
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<Demo />} />
            <Route path="/home" element={<Home />} />
            <Route path="/interview" element={<InterviewPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  </AuthProvider>
  );
}


export default App;
