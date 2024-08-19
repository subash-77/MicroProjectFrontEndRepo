import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from './Modal'; // Ensure you have a Modal component

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:1225/admin/allPatients")
      .then((response) => {
        setRecords(response.data);
        console.log(JSON.stringify(response.data, null, 2));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const openModal = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  const renderModalContent = () => {
    if (!selectedPayment) return null;

    const { amount, paymentDate, paymentType } = selectedPayment;

    return (
      <div>
        <h3 className="font-bold">Payment Details</h3>
        <p><strong>Amount:</strong> {amount}</p>
        <p><strong>Payment Date:</strong> {new Date(paymentDate).toLocaleDateString()}</p>
        <p><strong>Payment Type:</strong> {paymentType}</p>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {records.map((record) => (
          <div key={record.userId} className="relative border border-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{record.userName}</h2>
            <p><strong>Patient ID:</strong> {record.userId}</p>
            <p><strong>Email:</strong> {record.email}</p>
            <p><strong>Role:</strong> {record.role}</p>
            <div className="mt-4">
              <h3 className="font-semibold">Patient Info</h3>
              <p><strong>Name:</strong> {record.appointment[0].patientInfo.name}</p>
              <p><strong>Age:</strong> {record.appointment[0].patientInfo.age}</p>
              <p><strong>Gender:</strong> {record.appointment[0].patientInfo.gender}</p>
              <p><strong>Phone No:</strong> {record.appointment[0].patientInfo.phoneNo}</p>
              <button
                onClick={() => openModal(record.appointment[0].payment)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Payment Details
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Payment Details"
          content={renderModalContent()}
        />
      )}
    </div>
  );
};

export default Dashboard;
