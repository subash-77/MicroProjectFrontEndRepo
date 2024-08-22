import React, { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import PatientLayout from "../Component/PatientLayout";
import PsychiatristLayout from "../Component/PsychiatristLayout";
import AdminLayout from '../Component/AdminLayout';
const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userRole, setUserRole] = useState(null); // State to track user role
  const emailRef = useRef();
  const passwordRef = useRef();

  // Generate a random string for session storage
  if (!sessionStorage.getItem("randomvalues")) {
    function getRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    const randomString = getRandomString(10);
    sessionStorage.setItem("randomvalues", randomString);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = emailRef.current.value;
    const userPassword = passwordRef.current.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userEmail.match(emailRegex)) {
      setEmailError("Please enter a valid email address");
      setPasswordError("");
      return;
    } else {
      setEmailError("");
    }

    if (userPassword.trim() === "") {
      setPasswordError("Please enter your password");
      setEmailError("");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const response = await axios.post("http://localhost:1225/register/checkCredentials", {
        userName: '',
        email: userEmail,
        password: userPassword,
        role: 'patient'
      });

      const responseData = response.data.split(":");
      if (responseData[0] === "validCredentials" && responseData[1]) {
        sessionStorage.setItem("token", responseData[1]);
        const roles = responseData[2];
        const PsychiatristId = responseData[3];
        const PatientId = responseData[4];
        sessionStorage.setItem("patientid",PatientId);
        sessionStorage.setItem("psyid",PsychiatristId);
        sessionStorage.setItem("role", roles);
        setUserRole(roles); // Update state with user role
        setIsLoggedIn(true);

        // Optionally: Add token in backend
        await axios.post("http://localhost:1225/register/addToken", {
          email: userEmail,
          password: userPassword,
          token: responseData[1],
          randomValue: sessionStorage.getItem('randomvalues'),
        });
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (isLoggedIn) {
    // Conditionally render PatientLayout based on user role
    if (userRole === 'patient') {
      return <PatientLayout />;
    } else if(userRole === 'psychiatrist') {
      return <PsychiatristLayout/>;
    } else if(userRole === 'admin'){
      return <AdminLayout/>
    }
  }

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm mr-20">
        <img src="2.jpg" alt="Sample image" />
      </div>
  
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <label className="mr-1">Sign in with</label>
          <button type="button" className="mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]">
            <BiLogoFacebook size={20} className="flex justify-center items-center w-full" />
          </button>
          <button type="button" className="inlne-block mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]">
            <AiOutlineTwitter size={20} className="flex justify-center items-center w-full" />
          </button>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500"> Or </p>
        </div>
        <form onSubmit={handleSubmit}>
          <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" placeholder="Email Address" ref={emailRef} name="email"/>
          {emailError && <div className="text-red-500 text-xs mt-1" name="emailerror">{emailError}</div>}
          <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="password" placeholder="Password" ref={passwordRef} name="password"/>
          {passwordError && <div className="text-red-500 text-xs mt-1" name="passworderror">{passwordError}</div>}

          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label>
            <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">
              Forgot Password?
            </a>
          </div>
          <div className="text-center ml-36  mt-5 md:text-left">
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider button" name="L-btn" type="submit">
              Login
            </button>
          </div>
          <div className="mt-4  ml-20 font-semibold text-sm text-slate-500 text-center md:text-left">
            Don&apos;t have an account?{" "}
            <Link className="text-red-600 hover:underline hover:underline-offset-4" to={"/register"}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
