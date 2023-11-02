import React, { useState, useEffect } from 'react';

const NotificationBanner = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  // Automatically close the notification after a certain time (e.g., 5 seconds)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000); // 5000 milliseconds (5 seconds)

    return () => {
      clearTimeout(timeout);
    };
  }, [onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-400';
      case 'info':
        return 'bg-blue-400';
      case 'warning':
        return 'bg-yellow-400';
      case 'error':
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getTextColor = () => {
    return type === 'warning' ? 'text-black' : 'text-white';
  };

  return visible ? (
    <div
      className={`absolute top-16 left-1/2 transform -translate-x-1/2 p-4 ${getBackgroundColor()} ${getTextColor()} rounded-lg shadow-lg`}
    >
      <div className="container mx-auto text-center">
        <p>{message}</p>
      </div>
    </div>
  ) : null;
};

export default NotificationBanner;
