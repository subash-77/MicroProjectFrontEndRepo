import React from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <AiOutlineClose className="h-6 w-6" />
          </button>
        </div>
        <div>
          {content}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
