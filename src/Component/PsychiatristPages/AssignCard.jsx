import React from 'react';

const Card = ({ item, onClick, onAssign }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 relative">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAssign(item);
          }}
          className="absolute bottom-0 right-4 bg-blue-500 text-white px-2 py-1 rounded shadow hover:bg-blue-600 transition-colors duration-300"
        >
          Assign
        </button>
      </div>
    </div>
  );
};

export default Card;
