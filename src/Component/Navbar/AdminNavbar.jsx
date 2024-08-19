import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaBell, FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";

const AdminNavbar = () => {
  const [open, setOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true); // To track token validity
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Initially assuming user is logged in
  const navigate = useNavigate();

  const Menus = [
    { title: "Dashboard", src: "Chat", alt: "inbox_image", path: "/dashboard" },
    { title: "Appointment", src: "User", alt: "account_image", path: "/adminappointment" },
    { title: "Psychiatrist Record", src: "Chat", alt: "inbox_image", path: "/psychiatristrecord" },
    { title: "Patient Record", src: "User", alt: "account_image", path: "/patientrecord" },
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

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return {};
    }
  };
  // Check token validity when component mounts
//   useEffect(() => {
//     const fetchTokenDetails = async () => {
//       try {
//         const randomvalue = sessionStorage.getItem('randomvalues');
//         if (randomvalue) {
//           const response = await axios.get("http://localhost:1225/register/gettokendetails", {
//             params: { randomvalue: randomvalue }
//           });

//           if (response.data !== "Token is valid and not expired") {
//             // Token is not valid; handle logout
//             handleLogout();
//           }
//         } else {
//           console.error('No randomvalue found in sessionStorage');
//         }
//       } catch (error) {
//         console.error('Error fetching token details:', error);
//       }
//     };

//     fetchTokenDetails();
//   }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setIsTokenValid(false);
    window.alert("Successfully Logout - Session Expired");
    navigate('/');
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
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full transition-transform duration-300 ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          {/* <img
            src="./admin_icon.png"
            alt="logo_image"
            className={`cursor-pointer transition-transform duration-300 ${open && "rotate-[360deg]"}`}
          /> */}
          <h1
            className={`text-white origin-left font-medium text-xl transition-transform duration-300 ${
              !open && "scale-0"
            }`}
          >
            Admin
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${
                index === 0 && "bg-light-white"
              }`}
            >
              <Link to={Menu.path} className="flex items-center gap-x-4">
                <img src={`./${Menu.src}.png`} alt={`${Menu.alt}`} />
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
            <FaBell className="text-xl cursor-pointer" />
            <div className="relative">
              <FaUser
                className="text-xl cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              />
              {profileOpen && (
                <div className="absolute top-full right-0 bg-dark-purple text-white border border-gray-200 rounded-lg shadow-lg w-48 mt-2">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-light-gray cursor-pointer">View Profile</li>
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
    </div>
  );
};

export default AdminNavbar;
