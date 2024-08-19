import React from 'react';

const Card = ({ item, onClick }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={() => onClick(item)}
    >
      <div className="relative h-48"> {/* Container for the image */}
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.title}</h3>
      </div>
    </div>
  );
};

export default Card;
