// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Modal from './Modal'; // Ensure you have a Modal component
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons'; 

// const PatientRecords = () => {
//   const [records, setRecords] = useState([]);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     axios
//       .get("http://localhost:1225/admin/allPatients")
//       .then((response) => {
//         setRecords(response.data);
//         console.log(JSON.stringify(response.data, null, 2));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const openModal = (appointment) => {
//     setSelectedAppointment(appointment);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedAppointment(null);
//   };

//   const renderModalContent = () => {
//     if (!selectedAppointment) return null;

//     const { appointmentId, psychiatristId, appointmentDate, appointmentSlot, status, patientInfo, payment } = selectedAppointment;

//     return (
//       <div>
//         <h3 className="font-bold">Appointment Details</h3>
//         <p><strong>Appointment ID:</strong> {appointmentId}</p>
//         <p><strong>Psychiatrist ID:</strong> {psychiatristId}</p>
//         <p><strong>Date:</strong> {appointmentDate}</p>
//         <p><strong>Slot:</strong> {appointmentSlot}</p>
//         <p><strong>Status:</strong> {status}</p>
//         <h4 className="font-semibold">Patient Info</h4>
//         <p><strong>Name:</strong> {patientInfo.name}</p>
//         <p><strong>Age:</strong> {patientInfo.age}</p>
//         <p><strong>Gender:</strong> {patientInfo.gender}</p>
//         <p><strong>Phone No:</strong> {patientInfo.phoneNo}</p>
//         <h4 className="font-semibold">Payment Info</h4>
//         <p><strong>Amount:</strong> {payment.amount}</p>
//         <p><strong>Payment Date:</strong> {new Date(payment.paymentDate).toLocaleDateString()}</p>
//         <p><strong>Payment Type:</strong> {payment.paymentType}</p>
//       </div>
//     );
//   };

//   const handleDelete = (userId) => {
//     // Implement delete functionality
//     axios.delete("http://localhost:1225/admin/" + userId)
//       .then(() => {
//         setRecords(records.filter(record => record.userId !== userId));
//         alert("Patient record deleted successfully.");
//       })
//       .catch(err => {
//         console.error(err);
//         alert("Failed to delete patient record.");
//       });
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4 text-center">Patient Records</h1>
//       <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {records.map((record) => (
//           <div key={record.userId} className="relative border border-gray-200 rounded-lg p-4 shadow-sm">
//             <h2 className="text-xl font-semibold">{record.userName}</h2>
//             <p><strong>PatientId:</strong> {record.userId}</p>
//             <p><strong>Email:</strong> {record.email}</p>
//             <p><strong>Role:</strong> {record.role}</p>
//             <button
//               onClick={() => openModal(record.appointment[0])} // Assuming one appointment per patient
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               View Appointment Details
//             </button>
//             <button
//               onClick={() => handleDelete(record.userId)}
//               className="absolute bottom-4 right-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               <FontAwesomeIcon icon={faTrash} />
//             </button>
//           </div>
//         ))}
//       </div>
//       {isModalOpen && (
//         <Modal
//           isOpen={isModalOpen}
//           onClose={closeModal}
//           title="Appointment Details"
//           content={renderModalContent()}
//         />
//       )}
//     </div>
//   );
// };

// export default PatientRecords;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from './Modal'; // Ensure you have a Modal component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const PatientRecords = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:1225/admin/allPatients")
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
      setFilteredRecords(records.filter(record => record.userId === Number(searchId)));
    } else {
      setFilteredRecords(records);
    }
  }, [searchId, records]);

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const renderModalContent = () => {
    if (!selectedAppointment) return null;

    const { appointmentId, psychiatristId, appointmentDate, appointmentSlot, status, patientInfo, payment } = selectedAppointment;

    return (
      <div>
        <h3 className="font-bold">Appointment Details</h3>
        <p><strong>Appointment ID:</strong> {appointmentId}</p>
        <p><strong>Psychiatrist ID:</strong> {psychiatristId}</p>
        <p><strong>Date:</strong> {appointmentDate}</p>
        <p><strong>Slot:</strong> {appointmentSlot}</p>
        <p><strong>Status:</strong> {status}</p>
        <h4 className="font-semibold">Patient Info</h4>
        <p><strong>Name:</strong> {patientInfo.name}</p>
        <p><strong>Age:</strong> {patientInfo.age}</p>
        <p><strong>Gender:</strong> {patientInfo.gender}</p>
        <p><strong>Phone No:</strong> {patientInfo.phoneNo}</p>
        <h4 className="font-semibold">Payment Info</h4>
        <p><strong>Amount:</strong> {payment.amount}</p>
        <p><strong>Payment Date:</strong> {new Date(payment.paymentDate).toLocaleDateString()}</p>
        <p><strong>Payment Type:</strong> {payment.paymentType}</p>
      </div>
    );
  };

  const handleDelete = (userId) => {
    axios.delete("http://localhost:1225/admin/" + userId)
      .then(() => {
        setRecords(records.filter(record => record.userId !== userId));
        alert("Patient record deleted successfully.");
      })
      .catch(err => {
        console.error(err);
        alert("Failed to delete patient record.");
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Patient Records</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Patient ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full"
        />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRecords.map((record) => (
          <div key={record.userId} className="relative border border-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{record.userName}</h2>
            <p><strong>PatientId:</strong> {record.userId}</p>
            <p><strong>Email:</strong> {record.email}</p>
            <p><strong>Role:</strong> {record.role}</p>
            <button
              onClick={() => openModal(record.appointment[0])} // Assuming one appointment per patient
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View Appointment Details
            </button>
            <button
              onClick={() => handleDelete(record.userId)}
              className="absolute bottom-4 right-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Appointment Details"
          content={renderModalContent()}
        />
      )}
    </div>
  );
};

export default PatientRecords;
