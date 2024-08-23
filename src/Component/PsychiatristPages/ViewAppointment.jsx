// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from '../AdminPages/Modal'; // Import the modal component
// import { useNavigate } from 'react-router-dom';

// const ViewAppointment = () => {
//   const [columns, setColumns] = useState([]);
//   const [records, setRecords] = useState([]);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [modalType, setModalType] = useState(null); // "patientInfo"
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();
//   const id = sessionStorage.getItem('psyid');

//   useEffect(() => {
//     axios
//       .get(`http://localhost:1225/psychiatrist/findappointment/${id}`)
//       .then((response) => {
//         if (response.data.length > 0) {
//           // Filter out 'payment' and 'Action' columns
//           const initialColumns = Object.keys(response.data[0]).filter(column => column !== 'payment' && column !== 'Action');
//           setColumns(initialColumns);
//           setRecords(response.data);
//           console.log(JSON.stringify(response.data, null, 2));
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [id]);

//   const openModal = (record, type) => {
//     setSelectedRecord(record);
//     setModalType(type);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedRecord(null);
//     setModalType(null);
//   };

//   const renderModalContent = () => {
//     if (!selectedRecord) return null;

//     if (modalType === 'patientInfo') {
//       const { name, age, gender, phoneNo } = selectedRecord.patientInfo;
//       return (
//         <div>
//           <p><strong>Name:</strong> {name}</p>
//           <p><strong>Age:</strong> {age}</p>
//           <p><strong>Gender:</strong> {gender}</p>
//           <p><strong>Phone No:</strong> {phoneNo}</p>
//         </div>
//       );
//     }

//     return null;
//   };

//   const getTimeSlot = (slot) => {
//     switch (slot) {
//       case 'slot1':
//         return '10:00 - 11:00 AM';
//       case 'slot2':
//         return '02:00 - 03:00 PM';
//       case 'slot3':
//         return '07:00 - 08:00 PM';
//       default:
//         return 'Unknown Slot';
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4 text-center">Appointment Records</h1>
//       {records.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead className="bg-gray-800 text-white">
//               <tr>
//                 {columns.map((column, index) => (
//                   <th key={index} className="py-3 px-4 border-b border-gray-200 text-center">{column}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {records.map((record, rowIndex) => (
//                 <tr key={rowIndex} className="hover:bg-gray-100">
//                   {columns.map((column, colIndex) => (
//                     <td key={colIndex} className="py-3 px-4 border-b border-gray-200 text-center">
//                       {column === 'appointmentSlot' ? (
//                         getTimeSlot(record[column])
//                       ) : column === 'patientInfo' ? (
//                         <button
//                           onClick={() => openModal(record, 'patientInfo')}
//                           className="text-blue-500 hover:text-blue-700"
//                         >
//                           View
//                         </button>
//                       ) : (
//                         record[column] || 'N/A'
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-center">No appointment records available.</p>
//       )}
//       {isModalOpen && (
//         <Modal
//           isOpen={isModalOpen}
//           onClose={closeModal}
//           title={modalType === 'patientInfo' ? 'Patient Info' : ''}
//           content={renderModalContent()}
//         />
//       )}
//     </div>
//   );
// };

// export default ViewAppointment;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from '../AdminPages/Modal'; // Import the modal component
import { useNavigate } from 'react-router-dom';

const ViewAppointment = () => {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalType, setModalType] = useState(null); // "patientInfo"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const id = sessionStorage.getItem('psyid');

  useEffect(() => {
    axios
      .get(`http://localhost:1225/psychiatrist/findappointment/${id}`)
      .then((response) => {
        if (response.data.length > 0) {
          // Filter out 'psychiatristId', 'payment', and 'Action' columns
          const initialColumns = Object.keys(response.data[0])
            .filter(column => column !== 'psychiatristId' && column !== 'payment' && column !== 'Action');
          setColumns(initialColumns);
          setRecords(response.data);
          console.log(JSON.stringify(response.data, null, 2));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const openModal = (record, type) => {
    setSelectedRecord(record);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
    setModalType(null);
  };

  const renderModalContent = () => {
    if (!selectedRecord) return null;

    if (modalType === 'patientInfo') {
      const { name, age, gender, phoneNo } = selectedRecord.patientInfo;
      return (
        <div>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Age:</strong> {age}</p>
          <p><strong>Gender:</strong> {gender}</p>
          <p><strong>Phone No:</strong> {phoneNo}</p>
        </div>
      );
    }

    return null;
  };

  const getTimeSlot = (slot) => {
    switch (slot) {
      case 'slot1':
        return '10:00 - 11:00 AM';
      case 'slot2':
        return '02:00 - 03:00 PM';
      case 'slot3':
        return '07:00 - 08:00 PM';
      default:
        return 'Unknown Slot';
    }
  };

  return (
    <div className="p-4 ml-24">
      <h1 className="text-2xl font-bold mb-4 text-center">Appointment Records</h1>
      {records.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="py-3 px-4 border-b border-gray-200 text-center">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="py-3 px-4 border-b border-gray-200 text-center">
                      {column === 'appointmentSlot' ? (
                        getTimeSlot(record[column])
                      ) : column === 'patientInfo' ? (
                        <button
                          onClick={() => openModal(record, 'patientInfo')}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          View
                        </button>
                      ) : (
                        record[column] || 'N/A'
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No appointment records available.</p>
      )}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={modalType === 'patientInfo' ? 'Patient Info' : ''}
          content={renderModalContent()}
        />
      )}
    </div>
  );
};

export default ViewAppointment;
