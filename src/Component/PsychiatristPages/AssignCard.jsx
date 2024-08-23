// import React from 'react';

// const Card = ({ item, onClick, onAssign }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 relative h-52">
//       <img
//         src={item.image}
//         alt={item.title}
//         className="w-full h-32 object-cover"
//       />
//       <div className="p-4">
//         <h3 className="text-lg font-semibold">{item.title}</h3>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onAssign(item);
//           }}
//           className="absolute bottom-2 right-4 bg-blue-500 text-white px-2 py-1 rounded shadow hover:bg-blue-600 transition-colors duration-300"
//         >
//           Assign
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Card;
import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ item, onClick, onAssign }) => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 relative h-52"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(item)}
    >
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
          className="absolute bottom-2 right-4 bg-blue-500 text-white px-2 py-1 rounded shadow hover:bg-blue-600 transition-colors duration-300"
        >
          Assign
        </button>
      </div>
    </motion.div>
  );
};

export default Card;
