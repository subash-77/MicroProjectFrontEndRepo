import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaBell, FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import Modal from './PsychiatristProfileUpdateModal'; // Import the Modal component
import Toast from "./Toast";

// Modal component (as defined earlier)
const AlertModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p className="mt-4">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const PsychiatristNavbar = () => {
  const [open, setOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0); // State for notifications
  const [profile, setProfile] = useState(null); // State for profile data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State for modal message
  const navigate = useNavigate();
  const id = sessionStorage.getItem('psyid');


  const Menus = [
    { title: "View Assigned Appointments", src: "Search", alt: "account_image", path: "/viewassignedappointment" },
    { title: "Patient EHR", src: "User", alt: "inbox_image", path: "/patientehr" },
    { title: "Care Plan Assign", src: "Setting", alt: "account_image", path: "/careplanschedule" },
  ];

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        handleLogout();
      } else {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:1225/psychiatrist/${id}`)
        .then((response) => {
          setProfile(response.data);
          console.log(JSON.stringify(response.data, null, 2));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:1225/psychiatrist/findappointment/${id}`)
        .then((response) => {
          if (response.data.length > 0) {
            // Filter out 'payment' and 'Action' columns
            const initialColumns = Object.keys(response.data[0]).filter(column => column !== 'payment' && column !== 'Action');
            setColumns(initialColumns);
            setRecords(response.data);

            // Count notifications with status 'scheduled'
            const notifications = response.data.filter(record =>
              record.status === 'scheduled'
            );
            setNotificationCount(notifications.length);
            setShowToast(true);

            // console.log(JSON.stringify(response.data, null, 2));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return {};
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setIsTokenValid(false);
    setModalMessage("Successfully Logout - Session Expired");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/');
  };

  const handleBellClick = () => {
    navigate('/viewassignedappointment'); // Navigate to ViewAppointment component
  };

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`w-${open ? "72" : "20"} bg-dark-purple h-full p-5 pt-8 relative duration-300`}
      >
        <img
          src="./control.png"
          alt="control_image"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full transition-transform duration-300 ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          {/* <img
            src=""
            alt="logo_image"
            className={`cursor-pointer transition-transform duration-300 ${open && "rotate-[360deg]"}`}
          /> */}
          <h1
            className={`text-white origin-left font-medium text-xl transition-transform duration-300 ${!open && "scale-0"}`}
          >
            Psychiatrist
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${index === 0 && "bg-light-white"}`}
            >
              <Link to={Menu.path} className="flex items-center gap-x-4">
                <img src={`./${Menu.src}.png`} alt={Menu.alt} />
                <span className={`${!open && "hidden"} origin-left transition-transform duration-300`}>
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className={`fixed top-0 left-${open ? "72" : "20"} right-0 bg-dark-purple text-white flex items-center justify-end px-6 py-4`}>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <FaBell
                className="text-xl cursor-pointer"
                onClick={handleBellClick}
              />
              {notificationCount > 0 && (
                <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </div>
            <div className="relative">
              <FaUser
                className="text-xl cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              />
              {profileOpen && (
                <div className="absolute top-full right-0 bg-dark-purple text-white border border-gray-200 rounded-lg shadow-lg w-48 mt-2">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-light-gray cursor-pointer" onClick={handleProfileClick}>
                      View Profile
                    </li>
                    <li className="px-4 py-2 hover:bg-light-gray cursor-pointer" onClick={handleLogout}>
                      Logout
                    </li>
                  </ul>
                </div>
              )}
              <IoIosArrowDown
                className={`absolute top-2 left-6 transition-transform duration-300 ${profileOpen && "rotate-180"}`}
                size={16}
              />
            </div>
          </div>
        </div>

        {/* Rendered Content Area */}
        <main className="flex-1 overflow-auto mt-30"> {/* Adjust mt-16 based on top bar height */}
          <Outlet /> {/* This is where the route components will be rendered */}
        </main>
      </div>
      

      {isModalOpen && profile && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          profile={profile}
          onUpdate={handleProfileUpdate}
        />
      )}
      {/* Show Toast if showToast is true */}
      {showToast && (
          <Toast
            message="You have new notifications!"
            onClose={handleToastClose}
          />
        )}
         {/* Modal Component */}
       <AlertModal isOpen={showModal} onClose={closeModal} message={modalMessage} />
    </div>

  );
};

export default PsychiatristNavbar;
