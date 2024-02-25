import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const QuestionDisplay = ({ question, currentQuestionIndex, skipAnimate }) => (
  <div className="mb-3 bg-white border-gray-100 text-sm md:text-2xl px-2 rounded-lg text-slate-600" style={{ minHeight: '80px' }}>
    {question && (
      skipAnimate ? (
        <span>{question}</span>
      ) : (
        <TypeAnimation
          key={currentQuestionIndex}
          sequence={[question]}
          wrapper="span"
          speed={60}
          style={{ display: 'inline-block' }}
          repeat={0}
        />
      )
    )}
  </div>
);

export default QuestionDisplay;
