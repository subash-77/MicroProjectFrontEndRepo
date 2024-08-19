import { useState } from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const App = () => {
  const [open, setOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const Menus = [
    { title: "Dashboard", src: "Chart_fill", alt: "dashboard_image" },
    { title: "Inbox", src: "Chat", alt: "inbox_image" },
    { title: "Accounts", src: "User", gap: true, alt: "account_image" },
    { title: "Schedule", src: "Calendar", alt: "schedule_image" },
    { title: "Search", src: "Search", alt: "search_image" },
    { title: "Analytics", src: "Chart", alt: "analytics_image" },
    { title: "Files", src: "Folder", gap: true, alt: "files_image" },
    { title: "Setting", src: "Setting", alt: "settings_image" },
  ];

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-dark-purple h-screen p-5 pt-8 relative duration-300`}
      >
        <img
          src="./control.png"
          alt="control_image"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./logo.png"
            alt="logo_image"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${
                Menu.gap ? "mt-2" : "mt-2"
              } ${index === 0 && "bg-light-white"}`}
            >
              <img src={`./${Menu.src}.png`} alt={`${Menu.alt}`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        {/* Header with notification and profile icons */}
        <div className="bg-dark-purple h-16 flex items-center justify-end pr-6">
          <div className="flex items-center space-x-6">
            <FaBell className="text-white text-xl cursor-pointer" />
            <div className="relative">
              <FaUser
                className="text-white text-xl cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              />
              {profileOpen && (
                <div className="absolute top-12 right-0 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-lg w-48">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Profile</li>
                    <li className="px-4 py-2  hover:bg-gray-100 cursor-pointer">Logout</li>
                  </ul>
                </div>
              )}
              <IoIosArrowDown
                className={`absolute top-2 left-6 text-white ${profileOpen && "rotate-180"}`}
                size={16}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

// import React, { useState, useRef } from 'react';
// import { Container, Row, Col, Form, Button, Card, InputGroup, FormControl, Modal } from 'react-bootstrap';
// import { FaCcVisa, FaCcMastercard, FaGooglePay, FaApplePay, FaPhone } from 'react-icons/fa';
// import { ImCreditCard } from 'react-icons/im';
// import { AiOutlineCreditCard } from 'react-icons/ai';

// const PaymentPage = () => {
//   const [paymentMethod, setPaymentMethod] = useState('credit-card');
//   const [formErrors, setFormErrors] = useState({});
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showLoadingModal, setShowLoadingModal] = useState(false);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [showUpiModal, setShowUpiModal] = useState(false);

//   // Refs for form fields
//   const emailRef = useRef(null);
//   const phoneRef = useRef(null);
//   const cardNumberRef = useRef(null);
//   const expiryDateRef = useRef(null);
//   const cvcRef = useRef(null);
//   const termsRef = useRef(null);
//   const upiIdRef = useRef(null);

//   // Sample booking details
//   const bookingDetails = {
//     adults: { count: 2, pricePerHead: 500 },
//     children: { count: 1, pricePerHead: 250 },
//     totalAmount: 1250
//   };

//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method);
//     setFormErrors((prev) => ({ ...prev, cardNumber: '', expiryDate: '', cvc: '', upiId: '' }));
//   };

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validatePhone = (phone) => /^\d{10}$/.test(phone);
//   const validateCardNumber = (cardNumber) => /^\d{16}$/.test(cardNumber);
//   const validateExpiryDate = (expiryDate) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate);
//   const validateCVC = (cvc) => /^\d{3}$/.test(cvc);
//   const validateUpiId = (upiId) => /^[\w\.\-\_\@]{2,}$/i.test(upiId); // Basic UPI ID validation

//   const validateForm = () => {
//     let errors = {};
//     let valid = true;

//     if (!validateEmail(emailRef.current.value)) {
//       errors.email = 'Invalid email address';
//       valid = false;
//     }
//     if (!validatePhone(phoneRef.current.value)) {
//       errors.phone = 'Phone number must be 10 digits';
//       valid = false;
//     }
//     if (paymentMethod === 'credit-card') {
//       if (!validateCardNumber(cardNumberRef.current.value)) {
//         errors.cardNumber = 'Invalid card number';
//         valid = false;
//       }
//       if (!validateExpiryDate(expiryDateRef.current.value)) {
//         errors.expiryDate = 'Invalid expiry date format';
//         valid = false;
//       }
//       if (!validateCVC(cvcRef.current.value)) {
//         errors.cvc = 'Invalid CVC';
//         valid = false;
//       }
//     } else if (paymentMethod === 'upi') {
//       if (!validateUpiId(upiIdRef.current.value)) {
//         errors.upiId = 'Invalid UPI ID';
//         valid = false;
//       }
//     }
//     if (!termsRef.current.checked) {
//       errors.terms = 'You must agree to the terms and conditions';
//       valid = false;
//     }

//     setFormErrors(errors);
//     setIsFormValid(valid);
//     return valid;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (validateForm()) {
//       if (paymentMethod === 'upi') {
//         setShowUpiModal(true);
//       } else {
//         setShowLoadingModal(true);
//         // Simulate loading and then show success modal after 8 seconds
//         setTimeout(() => {
//           if (showCancelModal) {
//             setShowLoadingModal(false);
//             setShowCancelModal(false);
//           } else {
//             setShowLoadingModal(false);
//             setShowSuccessModal(true);
//           }
//         }, 8000);
//       }
//     }
//   };

//   const handleCancelPayment = () => {
//     setShowLoadingModal(false); // Close the loading modal
//     setShowCancelModal(true);   // Show the cancel modal

//     // Set a timeout to refresh the page after 2 seconds
//     setTimeout(() => {
//       window.location.reload();
//     }, 4000);
//   };

//   const handleCloseModal = () => {
//     // Generate a unique transaction ID
//     const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

//     // Store payment method and transaction ID in local storage
//     localStorage.setItem('paymentMethod', paymentMethod);
//     localStorage.setItem('transactionId', transactionId);

//     setShowSuccessModal(false);
//     setShowCancelModal(false);
//     setShowUpiModal(false);
//   };

//   return (
//     <Container className="my-5">
//       <Row className="align-items-center">
//         {/* Booking Summary Column */}
//         <Col md={4} className="d-none d-md-block">
//           <Card className="shadow-lg border-light">
//             <Card.Body>
//               <Card.Title className="text-center mb-4">Booking Summary</Card.Title>
//               <div className="d-flex flex-column">
//                 <div className="summary-item d-flex justify-content-between mb-3">
//                   <h5>Adults</h5>
//                   <p className="text-dark font-weight-bold">
//                     {bookingDetails.adults.count} x ₹{bookingDetails.adults.pricePerHead}
//                     = ₹{bookingDetails.adults.count * bookingDetails.adults.pricePerHead}
//                   </p>
//                 </div>
//                 <div className="summary-item d-flex justify-content-between mb-3">
//                   <h5>Children</h5>
//                   <p className="text-dark font-weight-bold">
//                     {bookingDetails.children.count} x ₹{bookingDetails.children.pricePerHead}
//                     = ₹{bookingDetails.children.count * bookingDetails.children.pricePerHead}
//                   </p>
//                 </div>
//                 <div className="summary-item d-flex justify-content-between mb-3">
//                   <h5>Total Number of People</h5>
//                   <p className="text-dark font-weight-bold">
//                     {bookingDetails.adults.count + bookingDetails.children.count}
//                   </p>
//                 </div>
//                 <div className="summary-item d-flex justify-content-between">
//                   <h5>Total Amount</h5>
//                   <h4 className="text-success font-weight-bold">
//                     ₹{bookingDetails.totalAmount}
//                   </h4>
//                 </div>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//         {/* Payment Form Column */}
//         <Col md={8}>
//           <Card className="shadow-lg border-light">
//             <Card.Body>
//               <Card.Title className="text-center mb-4">Complete Your Payment</Card.Title>

//               <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="formBasicEmail">
//                   <Form.Label>Email Address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter your email"
//                     ref={emailRef}
//                     isInvalid={!!formErrors.email}
//                   />
//                   <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId="formBasicPhone">
//                   <Form.Label>Phone Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter your phone number"
//                     ref={phoneRef}
//                     isInvalid={!!formErrors.phone}
//                   />
//                   <Form.Control.Feedback type="invalid">{formErrors.phone}</Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group>
//                   <Form.Label>Payment Method</Form.Label>
//                   <div className="d-flex flex-wrap justify-content-between mb-3">
//                     <Button
//                       variant={paymentMethod === 'credit-card' ? 'primary' : 'light'}
//                       onClick={() => handlePaymentMethodChange('credit-card')}
//                     >
//                       <ImCreditCard className="me-2" />
//                       Credit/Debit Card
//                     </Button>
//                     <Button
//                       variant={paymentMethod === 'google-pay' ? 'primary' : 'light'}
//                       onClick={() => handlePaymentMethodChange('google-pay')}
//                     >
//                       <FaGooglePay className="me-2" />
//                       Google Pay
//                     </Button>
//                     <Button
//                       variant={paymentMethod === 'phone-pay' ? 'primary' : 'light'}
//                       onClick={() => handlePaymentMethodChange('phone-pay')}
//                     >
//                       <FaPhone className="me-2" />
//                       PhonePe
//                     </Button>
//                     <Button
//                       variant={paymentMethod === 'apple-pay' ? 'primary' : 'light'}
//                       onClick={() => handlePaymentMethodChange('apple-pay')}
//                     >
//                       <FaApplePay className="me-2" />
//                       Apple Pay
//                     </Button>
//                     <Button
//                       variant={paymentMethod === 'upi' ? 'primary' : 'light'}
//                       onClick={() => handlePaymentMethodChange('upi')}
//                     >
//                       <AiOutlineCreditCard className="me-2" />
//                       UPI
//                     </Button>
//                   </div>
//                 </Form.Group>

//                 {paymentMethod === 'credit-card' && (
//                   <div>
//                     <Form.Group controlId="formCardNumber">
//                       <Form.Label>Card Number</Form.Label>
//                       <InputGroup>
//                         <InputGroup.Text>
//                           <FaCcVisa className="me-2" />
//                           <FaCcMastercard />
//                         </InputGroup.Text>
//                         <FormControl
//                           type="text"
//                           placeholder="Card Number"
//                           ref={cardNumberRef}
//                           isInvalid={!!formErrors.cardNumber}
//                         />
//                         <Form.Control.Feedback type="invalid">{formErrors.cardNumber}</Form.Control.Feedback>
//                       </InputGroup>
//                     </Form.Group>

//                     <Form.Group controlId="formCardExpiry">
//                       <Form.Label>Expiry Date</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="MM/YY"
//                         ref={expiryDateRef}
//                         isInvalid={!!formErrors.expiryDate}
//                       />
//                       <Form.Control.Feedback type="invalid">{formErrors.expiryDate}</Form.Control.Feedback>
//                     </Form.Group>

//                     <Form.Group controlId="formCardCvc">
//                       <Form.Label>CVC</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="CVC"
//                         ref={cvcRef}
//                         isInvalid={!!formErrors.cvc}
//                       />
//                       <Form.Control.Feedback type="invalid">{formErrors.cvc}</Form.Control.Feedback>
//                     </Form.Group>
//                   </div>
//                 )}

//                 {paymentMethod === 'upi' && (
//                   <Form.Group controlId="formUpiId">
//                     <Form.Label>UPI ID</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter your UPI ID"
//                       ref={upiIdRef}
//                       isInvalid={!!formErrors.upiId}
//                     />
//                     <Form.Control.Feedback type="invalid">{formErrors.upiId}</Form.Control.Feedback>
//                   </Form.Group>
//                 )}

//                 <Form.Group controlId="formTerms">
//                   <Form.Check
//                     type="checkbox"
//                     label="I agree to the terms and conditions"
//                     ref={termsRef}
//                     isInvalid={!!formErrors.terms}
//                   />
//                   <Form.Control.Feedback type="invalid">{formErrors.terms}</Form.Control.Feedback>
//                 </Form.Group>

//                 <Button variant="primary" type="submit" className="w-100 mt-3">
//                   Pay Now
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Blur Overlay */}
//       <div className={`blur-overlay ${showLoadingModal ? 'show' : ''} ${showUpiModal ? 'show' : ''}`}></div>

//       {/* Loading Modal */}
//       <Modal show={showLoadingModal} className="modal-transparent" centered>
//         <Modal.Body className="text-center">
//           <h4 className="h6 mt-5">Processing Payment...</h4>
//           <div className="d-flex justify-content-center mb-4">
//             <div className="loader">
//               <div className="train"></div>
//               <div className="track">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>
//             </div>
//           </div>
          
//           <Button variant="danger" onClick={handleCancelPayment} className="mt-3">
//             Cancel Payment
//           </Button>
//         </Modal.Body>
//       </Modal>

//       {/* UPI Modal */}
//       <Modal show={showUpiModal} onHide={handleCloseModal} centered>
//         <Modal.Body className="text-center">
//           <h4 className="h6 mt-5">Please complete the UPI payment</h4>
//           <p className="mb-4">You will be redirected to your UPI app to complete the payment. Once done, click the button below to confirm payment.</p>
//           <Button variant="primary" onClick={handleCloseModal} className="w-50">
//             Payment Done
//           </Button>
//         </Modal.Body>
//       </Modal>

//       {/* Success Modal */}
//       <Modal show={showSuccessModal} onHide={handleCloseModal} centered>
//         <Modal.Body className="text-center">
//           <div className="d-flex justify-content-center mb-4">
//             <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="green" className="bi bi-check-circle" viewBox="0 0 16 16">
//               <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM4.97 7.54a.75.75 0 0 1 1.06.03L8 8.563l2.97-2.97a.75.75 0 0 1 1.06 1.06L8 10.44 4.97 7.54z" />
//             </svg>
//           </div>
//           <h4 className="text-success mb-4">Payment Success</h4>
//           <Button variant="primary" onClick={handleCloseModal} className="w-50">
//             Close
//           </Button>
//         </Modal.Body>
//       </Modal>

//       {/* Cancel Modal */}
//       <Modal show={showCancelModal} onHide={handleCloseModal} centered>
//         <Modal.Body className="text-center">
//           <div className="d-flex justify-content-center mb-4">
//             <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="red" className="bi bi-x-circle" viewBox="0 0 16 16">
//               <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM5.854 5.146a.5.5 0 0 1 .707 0L8 6.793l1.439-1.646a.5.5 0 1 1 .722.691L8.5 7.5l1.661 1.659a.5.5 0 0 1-.722.692L8 8.207l-1.439 1.646a.5.5 0 0 1-.707-.707L7.293 8l-1.661-1.659a.5.5 0 0 1 0-.707z" />
//             </svg>
//           </div>
//           <h4 className="text-danger mb-4">Payment Cancelled</h4>
//           <Button variant="danger" onClick={handleCloseModal} className="w-50">
//             Close
//           </Button>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default PaymentPage;




