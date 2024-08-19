import React from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import PatientNavbar from './Navbar/PatientNavbar';

const PatientLayout = () => {
  const location = useLocation(); // Get the current location



  return (
    <>
      <div className="flex h-screen">
         <PatientNavbar />
         <div className="flex-1 p-7">
        </div>
      </div>
      {/* <Outlet /> */}
    </>
  )
}

export default PatientLayout
