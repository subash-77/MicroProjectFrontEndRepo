import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
    const [psychiatrists, setPsychiatrists] = useState([]);
    const [filteredPsychiatrists, setFilteredPsychiatrists] = useState([]);
    const [selectedPsychiatrist, setSelectedPsychiatrist] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [specializationFilter, setSpecializationFilter] = useState('');
    const [specializationOptions, setSpecializationOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:1225/psychiatrist/all")
            .then((response) => {
                const data = response.data;
                setPsychiatrists(data);
                setFilteredPsychiatrists(data);

                // Extract unique specialization options
                const options = Array.from(new Set(data.map(psychiatrist => psychiatrist.specialization)));
                setSpecializationOptions(options);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        // Filter psychiatrists based on selected specialization
        if (specializationFilter) {
            setFilteredPsychiatrists(
                psychiatrists.filter(psychiatrist => psychiatrist.specialization === specializationFilter)
            );
        } else {
            setFilteredPsychiatrists(psychiatrists);
        }
    }, [specializationFilter, psychiatrists]);

    const handleCardClick = (psychiatrist) => {
        setSelectedPsychiatrist(psychiatrist);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPsychiatrist(null);
    };

    const handleBookAppointment = () => {
        // Extract available slots from selected psychiatrist
        const slots = selectedPsychiatrist.psychiatristAvailability;
        setAvailableSlots(
            Object.keys(slots).filter(slotKey => slots[slotKey] === 1)
        );

        // Navigate to BookAppointment component with necessary details
        navigate('/book-appointment', {
            state: {
                psychiatristId: selectedPsychiatrist.psychiatristId,
                availableSlots: availableSlots,
                availableDate: selectedPsychiatrist.psychiatristAvailability.availableDate
            }
        });
    };

    const handleFilterChange = (event) => {
        setSpecializationFilter(event.target.value);
    };

    const renderSlotAvailability = (slots) => {
        const slotTimes = {
            slot1: "10 - 11 AM",
            slot2: "2 - 3 PM",
            slot3: "7 - 8 PM"
        };

        return Object.keys(slots)
            .filter(slotKey => slotKey.startsWith('slot'))
            .map(slotKey => {
                const slotNumber = slotKey.replace('slot', '');
                const isAvailable = slots[slotKey] === 1;
                return (
                    <p key={slotKey}>
                        <strong>Slot {slotNumber}:</strong> {slotTimes[slotKey]} - {isAvailable ? 'Available' : 'Unavailable'}
                    </p>
                );
            });
    };

    return (
        <main className="flex-1 overflow-auto ml-24 max-h-[calc(100vh-4rem)]">
            {/* Filter Dropdown */}
            <div className="mb-4 p-4">
                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">Filter by Specialization</label>
                <div className="relative mt-1">
                    <select
                        id="specialization"
                        value={specializationFilter}
                        onChange={handleFilterChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm bg-white transition-transform transform ease-in-out duration-300 hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">All Specializations</option>
                        {specializationOptions.map((specialization, index) => (
                            <option key={index} value={specialization}>{specialization}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
                {filteredPsychiatrists.map((psychiatrist) => (
                    <div key={psychiatrist.psychiatristId} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">{psychiatrist.username}</h3>
                            <p className="text-gray-500">{psychiatrist.specialization}</p>
                            <p className="mt-2 text-lg font-bold">Fees: ₹{psychiatrist.fees}</p>
                            <button
                                onClick={() => handleCardClick(psychiatrist)}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Psychiatrist Details */}
            {selectedPsychiatrist && (
                <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 transform transition-transform duration-300 ease-in-out">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-4">{selectedPsychiatrist.username}</h2>
                            <p><strong>Specialization:</strong> {selectedPsychiatrist.specialization}</p>
                            <p><strong>Experience:</strong> {selectedPsychiatrist.experienceYear} years</p>
                            <p><strong>Bio:</strong> {selectedPsychiatrist.bio}</p>
                            <p><strong>Education:</strong> {selectedPsychiatrist.education}</p>
                            <p><strong>Fees:</strong> ₹{selectedPsychiatrist.fees}</p>
                            <p><strong>Email:</strong> {selectedPsychiatrist.email}</p>
                            <p><strong>Available Date:</strong> {selectedPsychiatrist.psychiatristAvailability.availableDate}</p>
                            {renderSlotAvailability(selectedPsychiatrist.psychiatristAvailability)}
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    onClick={handleBookAppointment}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
                                >
                                    Book Appointment
                                </button>
                                <button
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-300"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Appointment;
