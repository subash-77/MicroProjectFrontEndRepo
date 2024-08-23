// import React from 'react';

// const Card = ({ item, onClick }) => {
//   return (
//     <div
//       className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
//       onClick={() => onClick(item)}
//     >
//       <div className="relative h-48"> {/* Container for the image */}
//         <img
//           src={item.image}
//           alt={item.title}
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//       </div>
//       <div className="p-4">
//         <h3 className="text-lg font-semibold">{item.title}</h3>
//       </div>
//     </div>
//   );
// };

// export default Card;
import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ item, onClick }) => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
      onClick={() => onClick(item)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.03, shadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
      transition={{ duration: 0.3 }}
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
    </motion.div>
  );
};

export default Card;
