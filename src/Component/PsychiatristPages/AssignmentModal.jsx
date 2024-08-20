import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignmentModal = ({ isOpen, onClose, itemId, psychiatristId }) => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // New state for tracking success

    const carecardId = itemId;

    useEffect(() => {
        if (isOpen && !isSuccess) { // Fetch patients only if the modal is open and no success message is shown
            axios.get("http://localhost:1225/admin/allPatients") // Adjust the endpoint as needed
                .then(response => {
                    const patientList = response.data.map(user => ({
                        id: user.userId,
                        name: user.appointment[0]?.patientInfo?.name || 'Unknown'
                    }));
                    setPatients(patientList);
                    console.log(JSON.stringify(patientList, null, 2));
                })
                .catch(error => console.error('Error fetching patients:', error));
        }
    }, [isOpen, isSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("*******************");
        console.log(carecardId);
        console.log(psychiatristId);
        console.log(selectedPatient);
        axios.post('http://localhost:1225/psychiatrist/addCarePlan', {
            carecardId,
            psychiatristId,
            patientId: selectedPatient,
            status: "pending"
        })
            .then(response => {
                console.log('Assignment successful:', response.data);
                setIsSuccess(true); // Update state to show success message
            })
            .catch(error => console.error('Error assigning item:', error));
    };

    const handleCloseSuccessModal = () => {
        setIsSuccess(false); // Reset success state
        onClose(); // Close the modal
    };

    return (
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                {isSuccess ? (
                    // Success message
                    <div className="text-center">
                        <svg className="mx-auto mb-4 h-16 w-16 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {/* <h2 className="text-xl font-semibold mb-4 text-gray-800">Success</h2> */}
                        <p className="text-blue-800-600">Care Plan Assigned Successfully!</p>
                        <button
                            onClick={handleCloseSuccessModal}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    // Assignment form
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Assign Item</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="patient" className="block text-sm font-medium text-gray-700">Select Patient</label>
                                <select
                                    id="patient"
                                    value={selectedPatient}
                                    onChange={(e) => setSelectedPatient(e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    required
                                >
                                    <option value="" disabled>Select a patient</option>
                                    {patients.map(patient => (
                                        <option key={patient.id} value={patient.id}>{patient.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-500 text-white px-4 py-2 rounded shadow mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded shadow"
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssignmentModal;
