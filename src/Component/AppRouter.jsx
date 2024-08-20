// // App.js
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PatientNavbar from './Navbar/PatientNavbar';
// import Appointment from './PatientPages/Appointment';
// import EHR from './PatientPages/EHR';
// import AllLandingComponent from '../LandingComponent/AllLandingComponent';
// import Register from '../LandingComponent/Register';
// import Login from '../LandingComponent/Login';

// const App = () => {
//   return (
//     <Router>
//         <Routes>
//             <Route path='/' element={<AllLandingComponent/>} />
//             <Route path='/register' element={<Register/>} />
//             <Route path='/login' element={<Login/>} />
//             <Route path='/login/register' element={<Register/>} />

//         </Routes>
//       <div className="flex h-screen">
//         <PatientNavbar />
//         <div className="flex-1 p-7">
//           <Routes>
//             <Route path="/appointment" element={<Appointment />} />
//             <Route path="/ehr" element={<EHR />} />

//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PatientNavbar from './Navbar/PatientNavbar';
import Appointment from './PatientPages/Appointment';
import EHR from './PatientPages/EHR';
import AllLandingComponent from '../LandingComponent/AllLandingComponent';
import Register from '../LandingComponent/Register';
import Login from '../LandingComponent/Login';
import PatientLayout from './PatientLayout';
import PsychiatristLayout from './PsychiatristLayout';
import AdminLayout from './AdminLayout';
import { useEffect, useState } from 'react';
import PatientEhr from './PsychiatristPages/PatientEhr';
import ViewAppointment from './PsychiatristPages/ViewAppointment';
import PsychiatristRecords from './AdminPages/PsychiatristRecords';
import PatientRecords from './AdminPages/PatientRecords';
import AdminAppointment from './AdminPages/AdminAppointment';
import Dashboard from './AdminPages/Dashboard';
import BookAppointment from './PatientPages/BookAppointment';
import WaitingRoom from './PatientPages/WaitingRoom';
import PatientEngagement from './PatientPages/PatientEngagement';
import CarePlan from './PatientPages/CarePlan';
import ProtectedRoute from './ProtectedRoute';
import CarePlanSchedule from './PsychiatristPages/CarePalnSchedule';

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<AllLandingComponent />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                {/* <Route path='/login/register' element={<Register />} /> */}
                <Route path='/patientlayout' element={<PatientLayout />} />

            </Routes>

            {/* <Routes>
                <Route element={<PatientLayout />}>
                    <Route path="/appointment" element={<ProtectedRoute element={<Appointment />} />} />
                    <Route path="/book-appointment" element={<ProtectedRoute element={<BookAppointment />} />} />
                    <Route path="/ehr"  element={<ProtectedRoute element={<EHR />} />} />
                    <Route path="/waitingroom"  element={<ProtectedRoute element={<WaitingRoom />} />}  />
                    <Route path="/patientengagement"  element={<ProtectedRoute element={<PatientEngagement />} />} />
                    <Route path="/careplan"  element={<ProtectedRoute element={<CarePlan />} />} />
                </Route>
            </Routes> */}
            <Routes>
                <Route element={<PatientLayout />}>
                    <Route path="/appointment" element={<ProtectedRoute element={<Appointment />} requiredRole="patient" />} />
                    <Route path="/book-appointment" element={<ProtectedRoute element={<BookAppointment />} requiredRole="patient" />} />
                    <Route path="/ehr" element={<ProtectedRoute element={<EHR />} requiredRole="patient" />} />
                    <Route path="/waitingroom" element={<ProtectedRoute element={<WaitingRoom />} requiredRole="patient" />} />
                    <Route path="/patientengagement" element={<ProtectedRoute element={<PatientEngagement />} requiredRole="patient" />} />
                    <Route path="/careplan" element={<ProtectedRoute element={<CarePlan />} requiredRole="patient" />} />
                </Route>
            </Routes>

            {/* <Routes>
                <Route element={<PsychiatristLayout />}>
                    <Route path="/patientehr" element={<ProtectedRoute element={<PatientEhr />} />} />
                    <Route path="/viewassignedappointment" element={<ProtectedRoute element={<ViewAppointment />} />} />
                    <Route path="/careplanschedule" element={<ProtectedRoute element={<CarePlanSchedule />} />} />
                </Route>
            </Routes> */}
            <Routes>
                <Route element={<PsychiatristLayout />}>
                    <Route path="/patientehr" element={<ProtectedRoute element={<PatientEhr />} requiredRole="psychiatrist" />} />
                    <Route path="/viewassignedappointment" element={<ProtectedRoute element={<ViewAppointment />} requiredRole="psychiatrist" />} />
                    <Route path="/careplanschedule" element={<ProtectedRoute element={<CarePlanSchedule />} requiredRole="psychiatrist" />} />
                </Route>
            </Routes>

            {/* <Routes>
                <Route element={<AdminLayout />}>
                    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                    <Route path="/adminappointment" element={<ProtectedRoute element={<AdminAppointment />} />} />
                    <Route path="/psychiatristrecord" element={<ProtectedRoute element={<PsychiatristRecords />} />} />
                    <Route path="/patientrecord" element={<ProtectedRoute element={<PatientRecords />} />} />
                </Route>
            </Routes> */}
            <Routes>
                <Route element={<AdminLayout />}>
                    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} requiredRole="admin" />} />
                    <Route path="/adminappointment" element={<ProtectedRoute element={<AdminAppointment />} requiredRole="admin" />} />
                    <Route path="/psychiatristrecord" element={<ProtectedRoute element={<PsychiatristRecords />} requiredRole="admin" />} />
                    <Route path="/patientrecord" element={<ProtectedRoute element={<PatientRecords />} requiredRole="admin" />} />
                </Route>
            </Routes>


        </Router>
    );
};

export default App;

