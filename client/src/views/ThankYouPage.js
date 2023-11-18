import React from 'react';

const ThankYouPage = () => {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="mb-6">
          Thank you for taking the time to complete the interview. Your responses are stored, and we'll get back to you with an exciting job offer as soon as possible.
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;
