import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity
  const navigate = useNavigate();

  const validate = () => {
    let errors = {};
    if (!formData.userName) errors.userName = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords not match";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Hardcoding role to "patient"
    const userData = { ...formData, role: "patient" };

    axios
      .post("http://localhost:1225/patient", userData)
      .then((res) => {
        alert("Registration successful");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Check form validity every time formData changes
    const validationErrors = validate();
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [formData]);

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm mr-20">
        <img
          src="2.jpg"
          alt="Sample"
          className="w-full h-auto"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            className={`text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded ${errors.userName ? 'border-red-500' : ''}`}
            type="text"
            id="username"
            placeholder="User Name"
            value={formData.userName}
            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
          />
          {errors.userName && <span className="text-red-500 mt-1">{errors.userName}</span>}

          <input
            className={`text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 ${errors.email ? 'border-red-500' : ''}`}
            type="text"
            id="emailaddress"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <span className="text-red-500 mt-1">{errors.email}</span>}

          <input
            className={`text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 ${errors.password ? 'border-red-500' : ''}`}
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {errors.password && <span className="text-red-500 mt-1">{errors.password}</span>}

          <input
            className={`text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 ${errors.confirmPassword ? 'border-red-500' : ''}`}
            type="password"
            id="confirmpassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
          {errors.confirmPassword && <span className="text-red-500 mt-1">{errors.confirmPassword}</span>}

          <button
            className={`mt-4 px-4 py-2 text-white uppercase rounded text-xs tracking-wider ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
            id="R-btn"
            type="submit"
            style={{ opacity: isFormValid ? 1 : 0.6 }}
          >
            REGISTER
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
