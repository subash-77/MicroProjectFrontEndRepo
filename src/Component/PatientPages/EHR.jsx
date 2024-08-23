import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";

// Ensure you call `Modal.setAppElement` to prevent screen readers from reading the background content
Modal.setAppElement('#root');

// EHR.js
const EHR = () => {
  const [ehrRecords, setEhrRecords] = useState([]);
  const [fileModalIsOpen, setFileModalIsOpen] = useState(false);
  const [descriptionModalIsOpen, setDescriptionModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalFileName, setModalFileName] = useState('');
  const [descriptionContent, setDescriptionContent] = useState('');
  const patientId = sessionStorage.getItem('patientid');

  useEffect(() => {
    if (patientId) {
      axios.get(`http://localhost:1225/patient/ehr?patientId=${patientId}`)
        .then(response => {
          setEhrRecords(response.data); // Set the fetched EHR records
          console.log(JSON.stringify(response.data, null, 2));
        })
        .catch(error => console.error('Error fetching EHR records:', error));
    }
  }, [patientId]);

  const handleViewInModal = (fileData, fileName) => {
    const blob = new Blob([Uint8Array.from(atob(fileData), c => c.charCodeAt(0))], { type: 'application/octet-stream' }); // Adjust MIME type if needed
    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result;
      setModalContent(content);
      setModalFileName(fileName);
      setFileModalIsOpen(true);
    };

    reader.readAsText(blob); // Read as text if you are handling text files
  };

  const handleDownload = (fileData, fileName) => {
    const link = document.createElement('a');
    link.href = `data:application/octet-stream;base64,${fileData}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewDescription = (description) => {
    setDescriptionContent(description);
    setDescriptionModalIsOpen(true);
  };

  const closeFileModal = () => {
    setFileModalIsOpen(false);
    setModalContent('');
    setModalFileName('');
  };

  const closeDescriptionModal = () => {
    setDescriptionModalIsOpen(false);
    setDescriptionContent('');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* <h1 className="text-3xl font-bold text-center mb-8">EHR Records for Patient ID: {patientId}</h1> */}
      <h1 className="text-3xl font-bold text-center mb-8">EHR Records For Patient</h1>
      {ehrRecords.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {ehrRecords.map(record => (
            <div key={record.recordId} className="bg-white shadow-md rounded-lg p-6 flex flex-col border border-gray-200">
              {/* <h2 className="text-2xl font-semibold mb-4 text-gray-800">Record ID: {record.recordId}</h2> */}
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Record </h2>
              <p className="text-gray-700 mb-2">
                <strong>Prescription:</strong>
                <button
                  onClick={() => handleViewDescription(record.description)}
                  className="ml-2 bg-gray-600 text-white py-1 px-2 rounded-md shadow hover:bg-gray-700 transition duration-300"
                >
                  View
                </button>
              </p>
              <p className="text-gray-700 mb-4"><strong>Record Date:</strong> {record.recordsDate}</p>
              {record.fileData && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleViewInModal(record.fileData, `record_${record.recordId}.txt`)} // Adjust extension and type if needed
                    className="bg-green-600 text-white py-2 px-4 rounded-md shadow hover:bg-green-700 transition duration-300"
                  >
                    View File
                  </button>
                  <button
                    onClick={() => handleDownload(record.fileData, `record_${record.recordId}.txt`)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition duration-300"
                  >
                    Download
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700 text-lg">No EHR records found for this patient.</p>
      )}

      {/* Modal for viewing file content */}
      <Modal
        isOpen={fileModalIsOpen}
        onRequestClose={closeFileModal}
        contentLabel="View File"
        className="fixed inset-0 bg-white p-4 sm:p-6 max-w-3xl ml-96 my-6 rounded-lg shadow-lg z-50 overflow-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60"
      >
        <div className="relative">
          <h2 className="text-xl font-semibold mb-16 text-gray-800">Viewing: {modalFileName}</h2>
          <pre className="whitespace-pre-wrap overflow-auto h-96 border border-gray-300 p-4 bg-gray-50 text-gray-700">
            {modalContent}
          </pre>
          <button
            onClick={closeFileModal}
            className="absolute top-2 right-2 bg-red-600 text-white py-1 px-3 rounded-md shadow hover:bg-red-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Modal for viewing description */}
      <Modal
        isOpen={descriptionModalIsOpen}
        onRequestClose={closeDescriptionModal}
        contentLabel="View Description"
        className="fixed inset-0 bg-white p-4 sm:p-6 max-w-3xl ml-96 my-6 rounded-lg shadow-lg z-50 overflow-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60"
      >
        <div className="relative">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Description</h2>
          <p className="text-gray-700 mb-4">{descriptionContent}</p>
          <button
            onClick={closeDescriptionModal}
            className="absolute top-2 right-2 bg-red-600 text-white py-1 px-3 rounded-md shadow hover:bg-red-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default EHR;
