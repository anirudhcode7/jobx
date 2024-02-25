import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

const TextInputWithMic = ({ value, onChange, isRecording, toggleRecording }) => (
  <div className="relative mt-2">
    <textarea
      className="p-2 pl-3 pr-10 border border-gray-300 rounded-md w-full"
      value={value}
      onChange={onChange}
    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
      <FontAwesomeIcon
        icon={faMicrophone}
        onClick={toggleRecording}
        className={`cursor-pointer ${isRecording ? 'text-green-500' : 'text-gray-500'}`}
        size="2x"
      />
    </div>
  </div>
);

export default TextInputWithMic;
