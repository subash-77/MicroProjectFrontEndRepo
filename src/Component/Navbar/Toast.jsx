import React, { useEffect } from 'react';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Toast will be visible for 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-14 right-4 z-50 w-80 bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative flex items-center p-4">
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-progress-bar" />
        <div className="flex-grow">{message}</div>
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
