// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const BookAppointment = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const { psychiatristId } = location.state || {};
//     const [userData, setUserData] = useState(null);
//     const [psychiatrists, setPsychiatrists] = useState([]);
//     const [selectedPsychiatrist, setSelectedPsychiatrist] = useState(null);
//     const [formData, setFormData] = useState({
//         psychiatristId: '',
//         appointmentDate: '',
//         appointmentSlot: '',
//         phoneNumber: '',
//         gender: '',
//         age: '',
//         amount: '',
//         paymentType: '',
//     });
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [isSuccess, setIsSuccess] = useState(false);

//     useEffect(() => {
//         axios
//             .get("http://localhost:1225/psychiatrist/all")
//             .then((response) => {
//                 setPsychiatrists(response.data);
//                 const psychiatrist = response.data.find(p => p.psychiatristId === psychiatristId);
//                 if (psychiatrist) {
//                     setSelectedPsychiatrist(psychiatrist);
//                     setFormData(prevState => ({
//                         ...prevState,
//                         psychiatristId: psychiatrist.psychiatristId,
//                         appointmentDate: psychiatrist.psychiatristAvailability.availableDate,
//                         amount: psychiatrist.fees // Set the fees as the amount
//                     }));
//                 }
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }, [psychiatristId]);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             const userId = sessionStorage.getItem('patientid');
//             if (userId) {
//                 try {
//                     const response = await axios.get(`http://localhost:1225/patient/${userId}`);
//                     setUserData(response.data);
//                 } catch (err) {
//                     console.error("Failed to fetch user data:", err);
//                 }
//             }
//         };

//         fetchUserData();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         // Additional validation for age to prevent negative numbers
//         if (name === 'age' && value < 0) {
//             return; // Prevent updating the state with negative values
//         }

//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const simulatePaymentProcessing = () => {
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 resolve(true); // Simulate successful payment
//             }, 5000); // Simulate a 5-second payment process
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         setIsProcessing(true);

//         try {
//             const patientId  = sessionStorage.getItem('patientid'); 
//             const paymentSuccess = await simulatePaymentProcessing();
//             if (!paymentSuccess) {
//                 alert("Payment failed. Please try again.");
//                 return;
//             }

//             setIsSuccess(true);

//             const appointmentData = {
//                 userId: patientId,
//                 userName: userData.userName,
//                 email: userData.email,
//                 password: userData.password,
//                 role: userData.role,
//                 appointment: [
//                     {
//                         psychiatristId: formData.psychiatristId,
//                         appointmentDate: formData.appointmentDate,
//                         appointmentSlot: formData.appointmentSlot,
//                         status: 'waiting',
//                         patientInfo: {
//                             name: formData.name,
//                             phoneNo: formData.phoneNumber,
//                             gender: formData.gender,
//                             age: formData.age
//                         },
//                         payment: {
//                             amount: formData.amount,
//                             paymentDate: new Date().toISOString(),
//                             paymentType: formData.paymentType,
//                         }
//                     }
//                 ]
//             };

//             await axios.post("http://localhost:1225/patient", appointmentData);
//             setIsProcessing(false);
//             setIsSuccess(true);
//         } catch (error) {
//             console.error("Failed to book appointment:", error);
//             alert("Failed to book appointment. Please try again.");
//         }
//     };

//     const renderSlotOptions = () => {
//         if (!selectedPsychiatrist) return null;

//         const availableSlots = Object.keys(selectedPsychiatrist.psychiatristAvailability)
//             .filter(slotKey => slotKey.startsWith('slot') && selectedPsychiatrist.psychiatristAvailability[slotKey] === 1);

//         const slotTimes = {
//             slot1: "10 - 11 AM",
//             slot2: "2 - 3 PM",
//             slot3: "7 - 8 PM"
//         };

//         return availableSlots.map(slotKey => {
//             const slotNumber = slotKey.replace('slot', '');
//             return (
//                 <option key={slotKey} value={slotKey}>
//                     Slot {slotNumber} - {slotTimes[slotKey]}
//                 </option>
//             );
//         });
//     };

//     return (
//         <main className="flex-1 overflow-auto max-h-[calc(100vh-4rem)]">
//             <div className="max-w-lg mx-auto p-6 ml-64  bg-white rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-semibold mb-4 text-gray-900">Book Appointment</h2>
//                 <form onSubmit={handleSubmit} className=''>
//                     {selectedPsychiatrist && (
//                         <>
//                             {/* <div className="mb-4 w-96">
//                                 <label htmlFor="psychiatristId" className="block text-sm font-medium text-gray-700">Psychiatrist ID</label>
//                                 <input
//                                     type="text"
//                                     id="psychiatristId"
//                                     value={formData.psychiatristId}
//                                     readOnly
//                                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700 p-2"
//                                 />
//                             </div> */}
//                             <div className="mb-4 w-96">
//                                 <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">Available Date</label>
//                                 <input
//                                     type="text"
//                                     id="appointmentDate"
//                                     value={formData.appointmentDate}
//                                     readOnly
//                                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700 p-2"
//                                 />
//                             </div>
//                         </>
//                     )}
//                     <div className="mb-4">
//                         <label htmlFor="appointmentSlot" className="block text-sm font-medium text-gray-700">Select Slot</label>
//                         <select
//                             id="appointmentSlot"
//                             name="appointmentSlot"
//                             value={formData.appointmentSlot}
//                             onChange={handleChange}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                             required
//                         >
//                             <option value="">Select Slot</option>
//                             {renderSlotOptions()}
//                         </select>
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="name" className="block text-sm font-medium text-gray-700">Patient Name</label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={formData.name || ''}
//                             onChange={handleChange}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
//                         <input
//                             type="text"
//                             id="phoneNumber"
//                             name="phoneNumber"
//                             value={formData.phoneNumber}
//                             onChange={handleChange}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
//                         <select
//                             id="gender"
//                             name="gender"
//                             value={formData.gender}
//                             onChange={handleChange}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                             required
//                         >
//                             <option value="">Select Gender</option>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                             <option value="Other">Other</option>
//                         </select>
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
//                         <input
//                             type="number"
//                             id="age"
//                             name="age"
//                             value={formData.age}
//                             onChange={handleChange}
//                             min="0" // Prevents negative numbers
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
//                         <input
//                             type="text"
//                             id="amount"
//                             name="amount"
//                             value={formData.amount}
//                             readOnly
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700 p-2"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700">Payment Type</label>
//                         <select
//                             id="paymentType"
//                             name="paymentType"
//                             value={formData.paymentType}
//                             onChange={handleChange}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                             required
//                         >
//                             <option value="">Select Payment Type</option>
//                             <option value="Credit Card">Credit Card</option>
//                             <option value="Debit Card">Debit Card</option>
//                             <option value="PayPal">PayPal</option>
//                             <option value="UPI">UPI</option>
//                         </select>
//                     </div>
//                     {formData.paymentType === 'UPI' && (
//                         <div className="mb-4">
//                             <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">UPI ID</label>
//                             <input
//                                 type="text"
//                                 id="upiId"
//                                 name="upiId"
//                                 value={formData.upiId || ''}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                             />
//                         </div>
//                     )}
//                     <div className="flex justify-end space-x-4">
//                         <button
//                             type="submit"
//                             className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                         >
//                             Submit
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => navigate('/appointment')}
//                             className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </form>

//                 {isProcessing && (
//                     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//                             <h2 className="text-lg font-semibold mb-4 text-gray-900">Processing Payment...</h2>
//                             <p className="text-gray-700">Please wait while we process your payment. This might take a few seconds.</p>
//                         </div>
//                     </div>
//                 )}

//                 {isSuccess && (
//                     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//                             <h2 className="text-lg font-semibold mb-4 text-gray-900">Payment Successful</h2>
//                             <p className="text-gray-700">Your payment was successful and your appointment has been booked.</p>
//                             <button
//                                 onClick={() => navigate('/waitingroom')}
//                                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                             >
//                                 View Appointment Detail
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </main>
//     );
// };

// export default BookAppointment;


// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const BookAppointment = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { psychiatristId } = location.state || {};

//     const [userData, setUserData] = useState(null);
//     const [psychiatrists, setPsychiatrists] = useState([]);
//     const [selectedPsychiatrist, setSelectedPsychiatrist] = useState(null);
//     const [formData, setFormData] = useState({
//         psychiatristId: '',
//         appointmentDate: '',
//         appointmentSlot: '',
//         phoneNumber: '',
//         gender: '',
//         age: '',
//         amount: '',
//         paymentType: '',
//     });
//     const [weekDates, setWeekDates] = useState([]);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [isSuccess, setIsSuccess] = useState(false);

//     useEffect(() => {
//         const fetchPsychiatrists = async () => {
//             try {
//                 const response = await axios.get("http://localhost:1225/psychiatrist/all");
//                 setPsychiatrists(response.data);
//                 const psychiatrist = response.data.find(p => p.psychiatristId === psychiatristId);
//                 if (psychiatrist) {
//                     setSelectedPsychiatrist(psychiatrist);
//                     setFormData(prevState => ({
//                         ...prevState,
//                         psychiatristId: psychiatrist.psychiatristId,
//                         amount: psychiatrist.fees
//                     }));
//                 }
//             } catch (err) {
//                 console.log(err);
//             }
//         };

//         fetchPsychiatrists();
//     }, [psychiatristId]);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             const userId = sessionStorage.getItem('patientid');
//             if (userId) {
//                 try {
//                     const response = await axios.get(`http://localhost:1225/patient/${userId}`);
//                     setUserData(response.data);
//                 } catch (err) {
//                     console.error("Failed to fetch user data:", err);
//                 }
//             }
//         };

//         fetchUserData();
//     }, []);

//     useEffect(() => {
//         const dates = getUpcomingDates();
//         setWeekDates(dates);
//     }, []);

//     const getUpcomingDates = () => {
//         const today = new Date();
//         const dates = [];

//         for (let i = 0; i < 7; i++) {
//             const date = new Date(today);
//             date.setDate(today.getDate() + i);
//             const formattedDate = date.toISOString().split('T')[0]; // Format YYYY-MM-DD
//             dates.push({
//                 date: formattedDate,
//                 label: formattedDate // Display in YYYY-MM-DD format
//             });
//         }

//         return dates;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         if (name === 'age' && value < 0) {
//             return; // Prevent updating the state with negative values
//         }

//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const simulatePaymentProcessing = () => {
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 resolve(true); // Simulate successful payment
//             }, 5000); // Simulate a 5-second payment process
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         setIsProcessing(true);

//         try {
//             const patientId = sessionStorage.getItem('patientid'); 
//             const paymentSuccess = await simulatePaymentProcessing();
//             if (!paymentSuccess) {
//                 alert("Payment failed. Please try again.");
//                 return;
//             }

//             setIsSuccess(true);

//             const appointmentData = {
//                 userId: patientId,
//                 userName: userData.userName,
//                 email: userData.email,
//                 password: userData.password,
//                 role: userData.role,
//                 appointment: [
//                     {
//                         psychiatristId: formData.psychiatristId,
//                         appointmentDate: formData.appointmentDate,
//                         appointmentSlot: formData.appointmentSlot,
//                         status: 'waiting',
//                         patientInfo: {
//                             name: formData.name,
//                             phoneNo: formData.phoneNumber,
//                             gender: formData.gender,
//                             age: formData.age
//                         },
//                         payment: {
//                             amount: formData.amount,
//                             paymentDate: new Date().toISOString(),
//                             paymentType: formData.paymentType,
//                         }
//                     }
//                 ]
//             };

//             await axios.post("http://localhost:1225/patient", appointmentData);
//             setIsProcessing(false);
//             setIsSuccess(true);
//         } catch (error) {
//             console.error("Failed to book appointment:", error);
//             alert("Failed to book appointment. Please try again.");
//         }
//     };

//     const renderSlotOptions = () => {
//         if (!selectedPsychiatrist) return null;

//         const availableSlots = Object.keys(selectedPsychiatrist.psychiatristAvailability)
//             .filter(slotKey => slotKey.startsWith('slot') && selectedPsychiatrist.psychiatristAvailability[slotKey] === 1);

//         const slotTimes = {
//             slot1: "10 - 11 AM",
//             slot2: "2 - 3 PM",
//             slot3: "7 - 8 PM"
//         };

//         return availableSlots.map(slotKey => {
//             const slotNumber = slotKey.replace('slot', '');
//             return (
//                 <option key={slotKey} value={slotKey}>
//                     Slot {slotNumber} - {slotTimes[slotKey]}
//                 </option>
//             );
//         });
//     };

//     return (
//         <main className="flex-1 overflow-auto max-h-[calc(100vh-4rem)]">
//             <div className="max-w-lg mx-auto p-6 ml-64 bg-white rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-semibold mb-4 text-gray-900">Book Appointment</h2>
//                 <form onSubmit={handleSubmit}>
//                     {selectedPsychiatrist && (
//                         <>
//                             <div className="mb-4 w-96">
//                                 <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">Select Date</label>
//                                 <select
//                                     id="appointmentDate"
//                                     name="appointmentDate"
//                                     value={formData.appointmentDate}
//                                     onChange={handleChange}
//                                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                                     required
//                                 >
//                                     <option value="">Select Date</option>
//                                     {weekDates.map(({ date, label }) => (
//                                         <option key={date} value={date}>
//                                             {label}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </>
//                     )}
//                     <div className="mb-4">
//                         <label htmlFor="appointmentSlot" className="block text-sm font-medium text-gray-700">Select Slot</label>
//                         <select
//                             id="appointmentSlot"
//                             name="appointmentSlot"
//                             value={formData.appointmentSlot}
//                             onChange={handleChange}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                             required
//                         >
//                             <option value="">Select Slot</option>
//                             {renderSlotOptions()}
//                         </select>
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="name" className="block text-sm font-medium text-gray-700">Patient Name</label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={formData.name || ''}
//                             onChange={handleChange}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
//                         <input
//                             type="text"
//                             id="phoneNumber"
//                             name="phoneNumber"
//                             value={formData.phoneNumber}
//                             onChange={handleChange}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
//                         <select
//                             id="gender"
//                             name="gender"
//                             value={formData.gender}
//                             onChange={handleChange}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                             required
//                         >
//                             <option value="">Select Gender</option>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                             <option value="Other">Other</option>
//                         </select>
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
//                         <input
//                             type="number"
//                             id="age"
//                             name="age"
//                             value={formData.age}
//                             onChange={handleChange}
//                             min="0" // Prevents negative numbers
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700">Payment Type</label>
//                         <select
//                             id="paymentType"
//                             name="paymentType"
//                             value={formData.paymentType}
//                             onChange={handleChange}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                             required
//                         >
//                             <option value="">Select Payment Type</option>
//                             <option value="Credit Card">Credit Card</option>
//                             <option value="Debit Card">Debit Card</option>
//                             <option value="PayPal">PayPal</option>
//                         </select>
//                     </div>
//                     {formData.paymentType === 'UPI' && (
//                         <div className="mb-4">
//                             <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">UPI ID</label>
//                             <input
//                                 type="text"
//                                 id="upiId"
//                                 name="upiId"
//                                 value={formData.upiId || ''}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                             />
//                         </div>
//                     )}
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
//                         disabled={isProcessing}
//                     >
//                         {isProcessing ? 'Processing...' : 'Book Appointment'}
//                     </button>
//                     {isSuccess && !isProcessing && <p className="mt-4 text-green-600">Appointment booked successfully!</p>}
//                 </form>

//                 {isProcessing && (
//                     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//                             <h2 className="text-lg font-semibold mb-4 text-gray-900">Processing Payment...</h2>
//                             <p className="text-gray-700">Please wait while we process your payment. This might take a few seconds.</p>
//                         </div>
//                     </div>
//                 )}

//                 {isSuccess && (
//                     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//                             <h2 className="text-lg font-semibold mb-4 text-gray-900">Payment Successful</h2>
//                             <p className="text-gray-700">Your payment was successful and your appointment has been booked.</p>
//                             <button
//                                 onClick={() => navigate('/waitingroom')}
//                                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                             >
//                                 View Appointment Detail
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </main>
//     );
// };

// export default BookAppointment;

//front end slot fetch illama crt
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookAppointment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { psychiatristId } = location.state || {};

    const [userData, setUserData] = useState(null);
    const [psychiatrists, setPsychiatrists] = useState([]);

    const [slotAvailable, setSlotAvailable] = useState({});
    const [selectedPsychiatrist, setSelectedPsychiatrist] = useState(null);
    const [formData, setFormData] = useState({
        psychiatristId: '',
        appointmentDate: '',
        appointmentSlot: '',
        phoneNumber: '',
        gender: '',
        age: '',
        amount: '',
        paymentType: '',
        name: '' // Added 'name' here
    });
    const [weekDates, setWeekDates] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchPsychiatrists = async () => {
            try {
                const response = await axios.get("http://localhost:1225/psychiatrist/all");
                setPsychiatrists(response.data);
                const psychiatrist = response.data.find(p => p.psychiatristId === psychiatristId);
                if (psychiatrist) {
                    setSelectedPsychiatrist(psychiatrist);
                    setFormData(prevState => ({
                        ...prevState,
                        psychiatristId: psychiatrist.psychiatristId,
                        amount: psychiatrist.fees
                    }));
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchPsychiatrists();
    }, [psychiatristId]);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = sessionStorage.getItem('patientid');
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:1225/patient/${userId}`);
                    setUserData(response.data);
                } catch (err) {
                    console.error("Failed to fetch user data:", err);
                }
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const dates = getUpcomingDates();
        setWeekDates(dates);
    }, []);

    const getUpcomingDates = () => {
        const today = new Date();
        const dates = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const formattedDate = date.toISOString().split('T')[0]; // Format YYYY-MM-DD
            dates.push({
                date: formattedDate,
                label: formattedDate // Display in YYYY-MM-DD format
            });
        }

        return dates;
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;

        if (name === 'age' && value < 0) {
            return; // Prevent updating the state with negative values
        }

        if (name === 'appointmentDate') {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));

            if (value) {
                const psychiaId = psychiatristId;
                const availableDate = value;
                try {
                    const response = await axios.get("http://localhost:1225/psychiatrist/getSlotWithavailableDatepsychiaId", {
                        params: {
                            availableDate,
                            psychiaId
                        }
                    });
                    console.log("Psychiatrist Availability",response.data);
                    setSlotAvailable(response.data || {});
                } catch (err) {
                    console.error("Failed to fetch available slots:", err);
                }
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const renderSlotOptions = () => {
        // Default slot times
        const defaultSlots = {
            slot1: "10 - 11 AM",
            slot2: "2 - 3 PM",
            slot3: "7 - 8 PM"
        };

        // If slotAvailable is empty or null, consider all slots available
        if (!slotAvailable || Object.keys(slotAvailable).length === 0) {
            return Object.entries(defaultSlots).map(([key, time]) => (
                <option key={key} value={key}>
                    {time}
                </option>
            ));
        }

        // Render slots based on slotAvailable data
        return Object.entries(defaultSlots).map(([slotKey, time]) => {
            const isAvailable = slotAvailable[slotKey] >= 1;
            return (
                <option
                    key={slotKey}
                    value={slotKey}
                    disabled={!isAvailable}
                >
                    {time}
                </option>
            );
        });
    };

    const simulatePaymentProcessing = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true); // Simulate successful payment
            }, 5000); // Simulate a 5-second payment process
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsProcessing(true);

        try {
            const patientId = sessionStorage.getItem('patientid');
            const paymentSuccess = await simulatePaymentProcessing();
            if (!paymentSuccess) {
                alert("Payment failed. Please try again.");
                return;
            }

            setIsSuccess(true);

            const appointmentData = {
                userId: patientId,
                userName: userData.userName,
                email: userData.email,
                password: userData.password,
                role: userData.role,
                appointment: [
                    {
                        psychiatristId: formData.psychiatristId,
                        appointmentDate: formData.appointmentDate,
                        appointmentSlot: formData.appointmentSlot,
                        status: 'waiting',
                        patientInfo: {
                            name: formData.name,
                            phoneNo: formData.phoneNumber,
                            gender: formData.gender,
                            age: formData.age
                        },
                        payment: {
                            amount: formData.amount,
                            paymentDate: new Date().toISOString(),
                            paymentType: formData.paymentType,
                        }
                    }
                ]
            };

            await axios.post("http://localhost:1225/patient", appointmentData);
            setIsProcessing(false);
            setIsSuccess(true);
        } catch (error) {
            console.error("Failed to book appointment:", error);
            alert("Failed to book appointment. Please try again.");
        }
    };

    return (
        <main className="flex-1 overflow-auto max-h-[calc(100vh-4rem)]">
            <div className="max-w-lg mx-auto p-6 ml-64 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Book Appointment</h2>
                <form onSubmit={handleSubmit}>
                    {selectedPsychiatrist && (
                        <>
                            <div className="mb-4 w-96">
                                <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">Select Date</label>
                                <select
                                    id="appointmentDate"
                                    name="appointmentDate"
                                    value={formData.appointmentDate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Date</option>
                                    {weekDates.map(({ date, label }) => (
                                        <option key={date} value={date}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}
                    <div className="mb-4">
                        <label htmlFor="appointmentSlot" className="block text-sm font-medium text-gray-700">Select Slot</label>
                        <select
                            id="appointmentSlot"
                            name="appointmentSlot"
                            value={formData.appointmentSlot}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Slot</option>
                            {renderSlotOptions()}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Patient Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700">Payment Type</label>
                        <select
                            id="paymentType"
                            name="paymentType"
                            value={formData.paymentType}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Payment Type</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Cash">Cash</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <p>Total Amount: {formData.amount}</p>
                    </div>
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-blue-500 text-white p-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {isProcessing ? "Processing..." : "Book Appointment"}
                    </button>
                </form>
                {isProcessing && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h2 className="text-lg font-semibold mb-4 text-gray-900">Processing Payment...</h2>
                            <p className="text-gray-700">Please wait while we process your payment. This might take a few seconds.</p>
                        </div>
                    </div>
                )}
                {isSuccess && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h2 className="text-lg font-semibold mb-4 text-gray-900">Payment Successful</h2>
                            <p className="text-gray-700">Your payment was successful and your appointment has been booked.</p>
                            <button
                                onClick={() => navigate('/waitingroom')}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                View Appointment Detail
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default BookAppointment;


