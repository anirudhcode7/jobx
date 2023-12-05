import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const QuestionDisplay = ({ question, currentQuestionIndex }) => (
  <div className="mb-6 bg-gray-200 p-4 rounded-lg">
    {question && (
      <TypeAnimation
        key={currentQuestionIndex}
        sequence={[question]}
        wrapper="span"
        speed={50}
        style={{ fontSize: '2em', display: 'inline-block' }}
        repeat={0}
      />
    )}
  </div>
);

export default QuestionDisplay;
