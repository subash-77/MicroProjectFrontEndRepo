import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const WaitingRoom = () => {
  const [records, setRecords] = useState([]);
  const id = sessionStorage.getItem('patientid');

  useEffect(() => {
    axios
      .get(`http://localhost:1225/patient/IsappointmentScheduledOrNot/${id}`)
      .then((response) => {
        if (response.data.length > 0) {
          setRecords(response.data);
          console.log(JSON.stringify(response.data, null, 2));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const slotTimes = {
    slot1: "10 - 11 AM",
    slot2: "2 - 3 PM",
    slot3: "7 - 8 PM"
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-2xl" />;
      case 'waiting':
        return <FontAwesomeIcon icon={faClock} className="text-yellow-500 text-2xl" />;
      case 'cancel':
        return <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-2xl" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {records.map((record) => (
        <div key={record.userId} className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{record.userName}</h2>
            <p className="text-gray-600">{record.email}</p>
          </div>
          {record.appointment.map((appointment) => (
            <div key={appointment.appointmentId} className="border-t border-gray-200 pt-4">
              <div className="flex items-center space-x-3 mb-3">
                {getStatusIcon(appointment.status)}
                <span
                  className={`font-semibold ${
                    appointment.status === 'scheduled'
                      ? 'text-green-500'
                      : appointment.status === 'waiting'
                      ? 'text-yellow-500'
                      : 'text-red-500'
                  }`}
                >
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-800"><strong>Appointment Date:</strong> {appointment.appointmentDate}</p>
              <p className="text-gray-800"><strong>Slot:</strong> {slotTimes[appointment.appointmentSlot] || 'Unknown Slot'}</p>
              <div className="mt-3">
                <p className="text-gray-800"><strong>Name:</strong> {appointment.patientInfo.name}</p>
                <p className="text-gray-800"><strong>Phone No:</strong> {appointment.patientInfo.phoneNo}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WaitingRoom;
