const Spinner = () => (
    <div className="relative w-16 h-16 flex items-center justify-center">
      {/* Background Circle with Gap */}
      <div className="relative w-full h-full flex ml-28 items-center justify-center">
        {/* <div className="w-12 h-12 border-4 border-gray-300 border-solid rounded-full"></div> */}
      </div>
  
      {/* Spinning Segments */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Spinner Circle 1 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
  
        {/* Spinner Circle 2 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-4 border-blue-300 border-solid rounded-full animate-spin-reverse"></div>
        </div>
      </div>
    </div>
  );
  
  export default Spinner;
  