import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

// Ensure you call `Modal.setAppElement` to prevent screen readers from reading the background content
Modal.setAppElement('#root');

const PatientEhr = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [prescription, setPrescription] = useState('');
  const [file, setFile] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [patientHistory, setPatientHistory] = useState('');
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const psychiatristId = sessionStorage.getItem('psyid');

  useEffect(() => {
    axios.get("http://localhost:1225/admin/allPatients")
      .then(response => {
        const patientList = response.data.map(user => ({
          id: user.userId,
          name: user.appointment[0]?.patientInfo?.name || 'Unknown'
        }));
        setPatients(patientList);
        console.log(JSON.stringify(patientList, null, 2));
      })
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString();

    const formData = new FormData();
    formData.append('patientId', selectedPatient);
    formData.append('description', prescription);
    formData.append('psychiatristId', psychiatristId);
    formData.append('recordsDate', currentDate);
    if (file) {
      formData.append('fileData', file);
    }
    console.log(formData);
    axios.put("http://localhost:1225/psychiatrist/addPrescription", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        setSuccessModalIsOpen(true);
        setSelectedPatient('');
        setPrescription('');
        setFile(null);
      })
      .catch(error => {
        console.error('Error submitting prescription:', error);
        alert('Failed to submit prescription');
      });
  };

  const openHistoryModal = () => {
    // Hardcoded patient history details
    const historyDetails = `
Patient History:

Record 1:
Date: 2023-05-12
Diagnosis: Flu
Prescription: Rest and fluids

Record 2:
Date: 2023-06-01
Diagnosis: Allergies
Prescription: Antihistamines

Record 3:
Date: 2023-12-20
Diagnosis: Healthy
Prescription: No prescriptions
`;

    setPatientHistory(historyDetails);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setPatientHistory('');
  };

  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };

  return (
    <div className="max-w-4xl ml-44  mx-auto  bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Patient Electronic Health Records (EHR)</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="patient" className="block text-sm font-medium text-gray-700 mb-2">Select Patient:</label>
            <select
              id="patient"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>Select a patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={openHistoryModal}
            className="w-full px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            View History
          </button>
          <div>
            <label htmlFor="prescription" className="block text-sm font-medium text-gray-700 mb-2">Prescription:</label>
            <textarea
              id="prescription"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              rows="8"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write the prescription here..."
              required
            />
          </div>

          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">Upload Document:</label>
            <input
              id="file"
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Submit Prescription
        </button>
      </form>

      {/* Modal for viewing patient history */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Patient History"
        className="fixed inset-0 bg-white p-4 sm:p-6 max-w-3xl ml-96 my-6 rounded-lg shadow-lg z-50 overflow-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60"
      >
        <div className="relative">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Patient History</h2>
          <pre className="whitespace-pre-wrap  mt-20 overflow-auto h-96 border border-gray-300 p-4 bg-gray-50 text-gray-700">
            {patientHistory}
          </pre>
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 bg-red-600 text-white py-1 px-3 rounded-md shadow hover:bg-red-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Modal for success message */}
      <Modal
        isOpen={successModalIsOpen}
        onRequestClose={closeSuccessModal}
        contentLabel="Success"
        className="fixed inset-0 bg-white p-4 sm:p-6 max-w-md mt-48 h-60 ml-96  rounded-lg shadow-lg z-50 flex flex-col items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60"
      >
        <div className="relative flex flex-col items-center">
          <svg className="animate-checkmark h-16 w-16 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          
          <p className="mt-2 text-blue-900-600">Prescription submitted successfully!</p>
          <button
            onClick={closeSuccessModal}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </Modal>

      <style jsx>{`
        @keyframes checkmark {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .animate-checkmark {
          animation: checkmark 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PatientEhr;
