// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from './Modal'; // Import the modal component
// import { useNavigate } from 'react-router-dom';

// const PsychiatristRecords = () => {
//   const [records, setRecords] = useState([]);
//   const [selectedAvailability, setSelectedAvailability] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     axios
//       .get("http://localhost:1225/psychiatrist/all")
//       .then((response) => {
//         setRecords(response.data);
//         console.log(JSON.stringify(response.data, null, 2));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const openModal = (availability) => {
//     setSelectedAvailability(availability);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedAvailability(null);
//   };

//   const renderAvailabilityContent = () => {
//     if (!selectedAvailability) return null;

//     return (
//       <div>
//         <p><strong>Available Date:</strong> {selectedAvailability.availableDate}</p>
//         <p><strong>Slot 1:</strong> {selectedAvailability.slot1 ? 'Available' : 'Not Available'}</p>
//         <p><strong>Slot 2:</strong> {selectedAvailability.slot2 ? 'Available' : 'Not Available'}</p>
//         <p><strong>Slot 3:</strong> {selectedAvailability.slot3 ? 'Available' : 'Not Available'}</p>
//       </div>
//     );
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Psychiatrist Records</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {records.map((psychiatrist) => (
//           <div key={psychiatrist.psychiatristId} className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
//             <h2 className="text-xl font-semibold mb-2">{psychiatrist.username}</h2>
//             <p><strong>PsychiatristId:</strong> {psychiatrist.psychiatristId}</p>
//             <p><strong>Email:</strong> {psychiatrist.email}</p>
//             <p><strong>Specialization:</strong> {psychiatrist.specialization}</p>
//             <p><strong>Experience:</strong> {psychiatrist.experienceYear} years</p>
//             <p><strong>Fees:</strong> ${psychiatrist.fees}</p>
//             <p className="mt-2 mb-4">{psychiatrist.bio}</p>
//             <button
//               onClick={() => openModal(psychiatrist.psychiatristAvailability)}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               View Availability
//             </button>
//           </div>
//         ))}
//       </div>
//       {isModalOpen && (
//         <Modal
//           isOpen={isModalOpen}
//           onClose={closeModal}
//           title="Availability Details"
//           content={renderAvailabilityContent()}
//         />
//       )}
//     </div>
//   );
// };

// export default PsychiatristRecords;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from './Modal'; // Import the modal component

const PsychiatristRecords = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:1225/psychiatrist/all")
      .then((response) => {
        setRecords(response.data);
        setFilteredRecords(response.data);
        console.log(JSON.stringify(response.data, null, 2));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (searchId) {
      setFilteredRecords(records.filter(record => record.psychiatristId === Number(searchId)));
    } else {
      setFilteredRecords(records);
    }
  }, [searchId, records]);

  const openModal = (availability) => {
    setSelectedAvailability(availability);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAvailability(null);
  };

  const renderAvailabilityContent = () => {
    if (!selectedAvailability) return null;

    return (
      <div>
        <p><strong>Available Date:</strong> {selectedAvailability.availableDate}</p>
        <p><strong>Slot 1:</strong> {selectedAvailability.slot1 ? 'Available' : 'Not Available'}</p>
        <p><strong>Slot 2:</strong> {selectedAvailability.slot2 ? 'Available' : 'Not Available'}</p>
        <p><strong>Slot 3:</strong> {selectedAvailability.slot3 ? 'Available' : 'Not Available'}</p>
      </div>
    );
  };

  return (
    
    <div className="p-6 mt-8">
      <h1 className="text-2xl font-bold mb-4">Psychiatrist Records</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Psychiatrist ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredRecords.map((psychiatrist) => (
          <div key={psychiatrist.psychiatristId} className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">{psychiatrist.username}</h2>
            <p><strong>PsychiatristId:</strong> {psychiatrist.psychiatristId}</p>
            <p><strong>Email:</strong> {psychiatrist.email}</p>
            <p><strong>Specialization:</strong> {psychiatrist.specialization}</p>
            <p><strong>Experience:</strong> {psychiatrist.experienceYear} years</p>
            <p><strong>Fees:</strong> ₹{psychiatrist.fees}</p>
            <p className="mt-2 mb-4">{psychiatrist.bio}</p>
            <button
              onClick={() => openModal(psychiatrist.psychiatristAvailability)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View Availability
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Availability Details"
          content={renderAvailabilityContent()}
        />
      )}
    </div>
  );
};

export default PsychiatristRecords;

