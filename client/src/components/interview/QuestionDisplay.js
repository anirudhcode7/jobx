import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const QuestionDisplay = ({ question, currentQuestionIndex }) => (
  <div className="mb-3 bg-white border-1 border-gray-100 text-sm md:text-2xl p-3 rounded-lg text-slate-600"  style={{ minHeight: '100px' }}>
    {question && (
      <TypeAnimation
        key={currentQuestionIndex}
        sequence={[question]}
        wrapper="span"
        speed={60}
        style={{  display: 'inline-block' }}
        repeat={0}
      />
    )}
  </div>
);

export default QuestionDisplay;
