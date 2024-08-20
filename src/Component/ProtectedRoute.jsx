// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = ({ element }) => {
//   const token = sessionStorage.getItem('token');

//   return token ? element : <Navigate to="/" />;
// };

// export default  ProtectedRoute;

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, requiredRole }) => {
  const token = sessionStorage.getItem('token');
  const userRole = sessionStorage.getItem('role');

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" />;
  }

  if (userRole !== requiredRole) {
    // If role doesn't match, redirect to home or an unauthorized page
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;

