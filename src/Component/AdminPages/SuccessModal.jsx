import React from 'react';
import { XIcon, CheckCircleIcon } from '@heroicons/react/solid'; // Import Heroicons

const SuccessModal = ({ isOpen, onClose, title, content, showSuccessIcon }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative">
        
        {showSuccessIcon && (
          <div className="flex justify-center mb-4">
            <CheckCircleIcon className="w-12 h-12 text-green-500 animate-tickAnimation" />
          </div>
        )}
        <svg className="animate-checkmark ml-36 h-16 w-16 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        <div className="mt-2 ml-8">{content}</div>
        <div className="flex mt-8 ml-36">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
