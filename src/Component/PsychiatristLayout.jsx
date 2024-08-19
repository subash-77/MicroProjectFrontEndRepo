import React from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import PsychiatristNavbar from './Navbar/PsychiatristNavbar';

const PatientLayout = () => {
  const location = useLocation(); // Get the current location



  return (
    <>
      <div className="flex h-screen">
         <PsychiatristNavbar />
         <div className="flex-1 p-7">
        </div>
      </div>
      {/* <Outlet /> */}
    </>
  )
}

export default PatientLayout
