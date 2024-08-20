// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from './Modal'; // Import the modal component
// import { useNavigate } from 'react-router-dom';

// const AdminAppointment = () => {
//   const [columns, setColumns] = useState([]);
//   const [records, setRecords] = useState([]);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [modalType, setModalType] = useState(null); // "patientInfo" or "payment"
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:1225/admin/allAppointment")
//       .then((response) => {
//         console.log("All Apointments ",JSON.stringify(response.data,null,2));
//         if (response.data.length > 0) {
//           // Add 'Action' to columns
//           const initialColumns = Object.keys(response.data[0]);
//           if (!initialColumns.includes('Action')) {
//             initialColumns.push('Action');
//           }
//           setColumns(initialColumns);
//           setRecords(response.data);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

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
//       const patientInfo = selectedRecord.patientInfo;
//       return (
//         <div>
//           <p><strong>Name:</strong> {patientInfo.name}</p>
//           <p><strong>Age:</strong> {patientInfo.age}</p>
//           <p><strong>Gender:</strong> {patientInfo.gender}</p>
//           <p><strong>Phone No:</strong> {patientInfo.phoneNo}</p>
//         </div>
//       );
//     }

//     if (modalType === 'payment') {
//       const payment = selectedRecord.payment;
//       return (
//         <div>
//           <p><strong>Amount:</strong> {payment.amount}</p>
//           <p><strong>Payment Date:</strong> {new Date(payment.paymentDate).toLocaleDateString()}</p>
//           <p><strong>Payment Type:</strong> {payment.paymentType}</p>
//         </div>
//       );
//     }

//     return null;
//   };

//   const handleApprove = (appointmentId) => {
//     const recordToUpdate = records.find(record => record.appointmentId === appointmentId);
  
//     if (recordToUpdate) {
//       const updatedRecord = {
//         ...recordToUpdate,
//         status: 'scheduled'
//       };
  
//       console.log('Updated Record:', JSON.stringify(updatedRecord, null, 2));
  
//       axios.post("http://localhost:1225/admin/updateAppointment", updatedRecord)
//         .then(response => {
//           setRecords(records.map(record =>
//             record.appointmentId === appointmentId ? updatedRecord : record
//           ));
//           alert("Record status updated to 'scheduled' successfully!");
  
//           axios.get(`http://localhost:1225/psychiatrist/${recordToUpdate.psychiatristId}`)
//             .then(response => {
//               const psychiatristData = response.data;
//               const updatedSlots = { ...psychiatristData };
  
//               if (recordToUpdate.appointmentSlot === 'slot1') {
//                 updatedSlots.psychiatristAvailability.slot1 = 0;
//               } else if (recordToUpdate.appointmentSlot === 'slot2') {
//                 updatedSlots.psychiatristAvailability.slot2 = 0;
//               } else if (recordToUpdate.appointmentSlot === 'slot3') {
//                 updatedSlots.psychiatristAvailability.slot3 = 0;
//               }
  
//               console.log('Updated Slot Data:', JSON.stringify(updatedSlots, null, 2));
  
//               axios.post("http://localhost:1225/psychiatrist", updatedSlots)
//                 .then(response => {
//                   console.log('Psychiatrist slots updated successfully!');
//                 })
//                 .catch(error => {
//                   console.error("Error updating psychiatrist's slots!", error);
//                 });
//             })
//             .catch(error => {
//               console.error("Error retrieving psychiatrist's slot information!", error);
//             });
//         })
//         .catch(error => {
//           console.error("Error updating record status!", error);
//         });
//     }
//   };

//   const handleCancel = (appointmentId) => {
//     const recordToUpdate = records.find(record => record.appointmentId === appointmentId);

//     if (recordToUpdate) {
//       const updatedRecord = {
//         ...recordToUpdate,
//         status: 'cancel'
//       };

//       console.log('Updated Record:', JSON.stringify(updatedRecord, null, 2));

//       axios.post("http://localhost:1225/admin/updateAppointment", updatedRecord)
//         .then(response => {
//           setRecords(records.map(record =>
//             record.appointmentId === appointmentId ? updatedRecord : record
//           ));
//           alert("Record status updated to 'cancel' successfully!");
//         })
//         .catch(error => {
//           console.error("Error updating record status!", error);
//         });
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
//                       {column === 'patientInfo' || column === 'payment' ? (
//                         <button
//                           onClick={() => openModal(record, column)}
//                           className="text-blue-500 hover:text-blue-700"
//                         >
//                           View
//                         </button>
//                       ) : column === 'Action' ? (
//                         <div className="flex justify-center space-x-2">
//                           <button
//                             onClick={() => handleApprove(record.appointmentId)}
//                             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                           >
//                             Approve
//                           </button>
//                           <button
//                             onClick={() => handleCancel(record.appointmentId)}
//                             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       ) : (
//                         record[column]
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
//           title={modalType === 'patientInfo' ? 'Patient Info' : 'Payment Info'}
//           content={renderModalContent()}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminAppointment;

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from './Modal'; // Import the modal component
// import { useNavigate } from 'react-router-dom';

// const AdminAppointment = () => {
//   const [columns, setColumns] = useState([]);
//   const [records, setRecords] = useState([]);
//   const [filteredRecords, setFilteredRecords] = useState([]);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [modalType, setModalType] = useState(null); // "patientInfo" or "payment"
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'scheduled', 'cancel', 'waiting'
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:1225/admin/allAppointment")
//       .then((response) => {
//         console.log("All Appointments ", JSON.stringify(response.data, null, 2));
//         if (response.data.length > 0) {
//           // Add 'Action' to columns
//           const initialColumns = Object.keys(response.data[0]);
//           if (!initialColumns.includes('Action')) {
//             initialColumns.push('Action');
//           }
//           setColumns(initialColumns);
//           setRecords(response.data);
//           setFilteredRecords(response.data); // Initialize filtered records
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   useEffect(() => {
//     if (statusFilter === 'all') {
//       setFilteredRecords(records);
//     } else {
//       setFilteredRecords(records.filter(record => record.status === statusFilter));
//     }
//   }, [statusFilter, records]);

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
//       const patientInfo = selectedRecord.patientInfo;
//       return (
//         <div>
//           <p><strong>Name:</strong> {patientInfo.name}</p>
//           <p><strong>Age:</strong> {patientInfo.age}</p>
//           <p><strong>Gender:</strong> {patientInfo.gender}</p>
//           <p><strong>Phone No:</strong> {patientInfo.phoneNo}</p>
//         </div>
//       );
//     }

//     if (modalType === 'payment') {
//       const payment = selectedRecord.payment;
//       return (
//         <div>
//           <p><strong>Amount:</strong> {payment.amount}</p>
//           <p><strong>Payment Date:</strong> {new Date(payment.paymentDate).toLocaleDateString()}</p>
//           <p><strong>Payment Type:</strong> {payment.paymentType}</p>
//         </div>
//       );
//     }

//     return null;
//   };

//   const handleApprove = (appointmentId) => {
//     const recordToUpdate = records.find(record => record.appointmentId === appointmentId);
  
//     if (recordToUpdate) {
//       const updatedRecord = {
//         ...recordToUpdate,
//         status: 'scheduled'
//       };
  
//       console.log('Updated Record:', JSON.stringify(updatedRecord, null, 2));
  
//       axios.post("http://localhost:1225/admin/updateAppointment", updatedRecord)
//         .then(response => {
//           setRecords(records.map(record =>
//             record.appointmentId === appointmentId ? updatedRecord : record
//           ));
//           alert("Record status updated to 'scheduled' successfully!");
  
//           axios.get(`http://localhost:1225/psychiatrist/${recordToUpdate.psychiatristId}`)
//             .then(response => {
//               const psychiatristData = response.data;
//               const updatedSlots = { ...psychiatristData };
  
//               if (recordToUpdate.appointmentSlot === 'slot1') {
//                 updatedSlots.psychiatristAvailability.slot1 = 0;
//               } else if (recordToUpdate.appointmentSlot === 'slot2') {
//                 updatedSlots.psychiatristAvailability.slot2 = 0;
//               } else if (recordToUpdate.appointmentSlot === 'slot3') {
//                 updatedSlots.psychiatristAvailability.slot3 = 0;
//               }
  
//               console.log('Updated Slot Data:', JSON.stringify(updatedSlots, null, 2));
  
//               axios.post("http://localhost:1225/psychiatrist", updatedSlots)
//                 .then(response => {
//                   console.log('Psychiatrist slots updated successfully!');
//                 })
//                 .catch(error => {
//                   console.error("Error updating psychiatrist's slots!", error);
//                 });
//             })
//             .catch(error => {
//               console.error("Error retrieving psychiatrist's slot information!", error);
//             });
//         })
//         .catch(error => {
//           console.error("Error updating record status!", error);
//         });
//     }
//   };

//   const handleCancel = (appointmentId) => {
//     const recordToUpdate = records.find(record => record.appointmentId === appointmentId);

//     if (recordToUpdate) {
//       const updatedRecord = {
//         ...recordToUpdate,
//         status: 'cancel'
//       };

//       console.log('Updated Record:', JSON.stringify(updatedRecord, null, 2));

//       axios.post("http://localhost:1225/admin/updateAppointment", updatedRecord)
//         .then(response => {
//           setRecords(records.map(record =>
//             record.appointmentId === appointmentId ? updatedRecord : record
//           ));
//           alert("Record status updated to 'cancel' successfully!");
//         })
//         .catch(error => {
//           console.error("Error updating record status!", error);
//         });
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4 text-center">Appointment Records</h1>

//       <div className="mb-4 text-center">
//         <button
//           onClick={() => setStatusFilter('all')}
//           className={`px-4 py-2 mr-2 ${statusFilter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
//         >
//           All
//         </button>
//         <button
//           onClick={() => setStatusFilter('scheduled')}
//           className={`px-4 py-2 mr-2 ${statusFilter === 'scheduled' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
//         >
//           Scheduled
//         </button>
//         <button
//           onClick={() => setStatusFilter('waiting')}
//           className={`px-4 py-2 mr-2 ${statusFilter === 'waiting' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
//         >
//           Waiting
//         </button>
//         <button
//           onClick={() => setStatusFilter('cancel')}
//           className={`px-4 py-2 ${statusFilter === 'cancel' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
//         >
//           Cancel
//         </button>
//       </div>

//       {filteredRecords.length > 0 ? (
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
//               {filteredRecords.map((record, rowIndex) => (
//                 <tr key={rowIndex} className="hover:bg-gray-100">
//                   {columns.map((column, colIndex) => (
//                     <td key={colIndex} className="py-3 px-4 border-b border-gray-200 text-center">
//                       {column === 'patientInfo' || column === 'payment' ? (
//                         <button
//                           onClick={() => openModal(record, column)}
//                           className="text-blue-500 hover:text-blue-700"
//                         >
//                           View
//                         </button>
//                       ) : column === 'Action' ? (
//                         <div className="flex justify-center space-x-2">
//                           <button
//                             onClick={() => handleApprove(record.appointmentId)}
//                             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                           >
//                             Approve
//                           </button>
//                           <button
//                             onClick={() => handleCancel(record.appointmentId)}
//                             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       ) : (
//                         record[column]
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
//           title={modalType === 'patientInfo' ? 'Patient Info' : 'Payment Info'}
//           content={renderModalContent()}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminAppointment;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import SuccessModal from './SuccessModal'; // Import the modal component
import Spinner from './Spinner'; // Import the spinner component

const AdminAppointment = () => {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalType, setModalType] = useState(null); // "patientInfo" or "payment"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'scheduled', 'cancel', 'waiting'
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    axios
      .get("http://localhost:1225/admin/allAppointment")
      .then((response) => {
        console.log("All Appointments ", JSON.stringify(response.data, null, 2));
        if (response.data.length > 0) {
          const initialColumns = Object.keys(response.data[0]);
          if (!initialColumns.includes('Action')) {
            initialColumns.push('Action');
          }
          setColumns(initialColumns);
          setRecords(response.data);
          setFilteredRecords(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredRecords(records);
    } else {
      setFilteredRecords(records.filter(record => record.status === statusFilter));
    }
  }, [statusFilter, records]);

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
      const patientInfo = selectedRecord.patientInfo;
      return (
        <div>
          <p><strong>Name:</strong> {patientInfo.name}</p>
          <p><strong>Age:</strong> {patientInfo.age}</p>
          <p><strong>Gender:</strong> {patientInfo.gender}</p>
          <p><strong>Phone No:</strong> {patientInfo.phoneNo}</p>
        </div>
      );
    }

    if (modalType === 'payment') {
      const payment = selectedRecord.payment;
      return (
        <div>
          <p><strong>Amount:</strong> {payment.amount}</p>
          <p><strong>Payment Date:</strong> {new Date(payment.paymentDate).toLocaleDateString()}</p>
          <p><strong>Payment Type:</strong> {payment.paymentType}</p>
        </div>
      );
    }

    return null;
  };

  const handleApprove = (appointmentId) => {
    setIsLoading(true);
    setSuccessMessage('');
    const recordToUpdate = records.find(record => record.appointmentId === appointmentId);
  
    if (recordToUpdate) {
      const updatedRecord = { ...recordToUpdate, status: 'scheduled' };
  
      axios.post("http://localhost:1225/admin/updateAppointment", updatedRecord)
        .then(response => {
          setRecords(records.map(record =>
            record.appointmentId === appointmentId ? updatedRecord : record
          ));
  
          return axios.get(`http://localhost:1225/psychiatrist/${recordToUpdate.psychiatristId}`);
        })
        .then(response => {
          const psychiatristData = response.data;
          const updatedSlots = { ...psychiatristData };
  
          if (recordToUpdate.appointmentSlot === 'slot1') {
            updatedSlots.psychiatristAvailability.slot1 = 0;
          } else if (recordToUpdate.appointmentSlot === 'slot2') {
            updatedSlots.psychiatristAvailability.slot2 = 0;
          } else if (recordToUpdate.appointmentSlot === 'slot3') {
            updatedSlots.psychiatristAvailability.slot3 = 0;
          }
  
          return axios.post("http://localhost:1225/psychiatrist", updatedSlots);
        })
        .then(() => {
          setSuccessMessage("Email has been sent to the patient and psychiatrist successfully!");
        })
        .catch(error => {
          console.error("Error updating record or slots!", error);
          setSuccessMessage("There was an error processing your request.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleCancel = (appointmentId) => {
    setIsLoading(true);
    setSuccessMessage('');
    const recordToUpdate = records.find(record => record.appointmentId === appointmentId);

    if (recordToUpdate) {
      const updatedRecord = { ...recordToUpdate, status: 'cancel' };

      axios.post("http://localhost:1225/admin/updateAppointment", updatedRecord)
        .then(response => {
          setRecords(records.map(record =>
            record.appointmentId === appointmentId ? updatedRecord : record
          ));
          setSuccessMessage("Record status updated to 'cancel' successfully!");
        })
        .catch(error => {
          console.error("Error updating record status!", error);
          setSuccessMessage("There was an error processing your request.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Appointment Records</h1>

      <div className="mb-4 text-center">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 mr-2 ${statusFilter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setStatusFilter('scheduled')}
          className={`px-4 py-2 mr-2 ${statusFilter === 'scheduled' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
        >
          Scheduled
        </button>
        <button
          onClick={() => setStatusFilter('waiting')}
          className={`px-4 py-2 mr-2 ${statusFilter === 'waiting' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
        >
          Waiting
        </button>
        <button
          onClick={() => setStatusFilter('cancel')}
          className={`px-4 py-2 ${statusFilter === 'cancel' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
        >
          Cancel
        </button>
      </div>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <Spinner />
        </div>
      )}

      {filteredRecords.length > 0 ? (
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
              {filteredRecords.map((record, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="py-3 px-4 border-b border-gray-200 text-center">
                      {column === 'patientInfo' || column === 'payment' ? (
                        <button
                          onClick={() => openModal(record, column)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          View
                        </button>
                      ) : column === 'Action' ? (
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleApprove(record.appointmentId)}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleCancel(record.appointmentId)}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        record[column]
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
          title={modalType === 'patientInfo' ? 'Patient Info' : 'Payment Info'}
          content={renderModalContent()}
        />
      )}

      {successMessage && (
        <SuccessModal
          isOpen={!!successMessage}
          onClose={() => setSuccessMessage('')}
          title="Success"
          content={<p>{successMessage}</p>}
        />
      )}
    </div>
  );
};

export default AdminAppointment;

