import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const QuestionDisplay = ({ question, currentQuestionIndex }) => (
  <div className="mb-6 bg-white border-1 border-gray-100 text-xl p-4 rounded-lg">
    {question && (
      <TypeAnimation
        key={currentQuestionIndex}
        sequence={[question]}
        wrapper="span"
        speed={50}
        style={{  display: 'inline-block' }}
        repeat={0}
      />
    )}
  </div>
);

export default QuestionDisplay;
