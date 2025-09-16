import React from 'react';
import Input from "../../components/Inputs/input";
import { useNavigate } from "react-router-dom";
import  { useState } from 'react';
import { validationEmail } from "../../utils/helper";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from "../../utils/apiPaths";  // ✅ imported here
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';


const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();
  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validationEmail(email)) {
      setError("please enter a valid email");
      return;
    }

    if(!password) {
      setError("please enter your password");
      return;
    }

    setError("")

    // login api call
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token } = response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(response.data)
        navigate("/dashboard")
      }
    }catch(error){
      if(error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  //     if (token) {
  //     localStorage.setItem("token", token);
  //     navigate("/dashboard");
  //   }
  // } catch (error) {
  //   console.error("Login error:", error);

  //   if (error.response?.data?.message) {
  //     setError(error.response.data.message);
  //   } else if (error.response?.data?.error) {
  //     setError(error.response.data.error);
  //   } else {
  //     setError(error.message || "An unexpected error occurred");
  //   }
  // }
  };
  return (
   <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
  <h3 className="text-2xl font-bold text-gray-900 text-center">Welcome Back</h3>
  <p className="text-sm text-gray-600 mt-2 mb-6 text-center">
    Please enter your details to log in
  </p>

  <form onSubmit={handleLogin} className="space-y-5">
    <Input
      value={email}
      onChange={({ target }) => setEmail(target.value)}
      label="Email Address"
      placeholder="john@example.com"
      type="text"
    />

    <Input
      value={password}
      onChange={({ target }) => setPassword(target.value)}
      label="Password"
      placeholder="Min 8 Characters"
      type="password"
    />

    {error && (
      <p className="text-sm text-red-500">{error}</p>
    )}

    <button
      type="submit"
      className="w-full py-3 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-white font-semibold rounded-lg shadow-md hover:from-black hover:to-black transition-all duration-300"
    >
      Log In
    </button>

    <p className="text-sm text-gray-700 text-center mt-4">
      Don’t have an account?{" "}
      <button
        type="button"
        className="text-[#FF9324] font-semibold hover:underline"
        onClick={() => setCurrentPage("signup")}
      >
        Sign Up
      </button>
    </p>
  </form>
</div>

  );
};

export default Login;