
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { X } from 'lucide-react'; 
// import Input from "../../components/Inputs/input";
// import axiosInstance from '../../utils/axiosInstance';
// import { API_PATHS } from '../../utils/apiPaths';

// const SignUp = ({ setCurrentPage, onClose, updateUser }) => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(""); // ✅ success state

//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     if (!fullName) {
//       setError("Please enter your full name");
//       return;
//     }
//     if (!email) {
//       setError("Please enter your email");
//       return;
//     }
//     if (!password) {
//       setError("Please enter your password");
//       return;
//     }

//     setError("");
//     setSuccess(""); // reset before new request

//     try {
//       const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
//         name: fullName,
//         email,
//         password,
//       });

//       const { token } = response.data;

//       if (token) {
//         localStorage.setItem("token", token);

//         if (updateUser) updateUser(response.data);

//         // ✅ success message
//         setSuccess("Successfully Registered 🎉");

//         // redirect after short delay
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 1500);
//       }
//     } catch (error) {
//       if (error.response && error.response.data) {
//         console.log("Backend error 👉", error.response.data);
//         setError(error.response.data.message || "Signup failed");
//       } else {
//         setError("Something went wrong. Please try again later.");
//       }
//     }
//   };

//   const handleClose = () => {
//     if (onClose) {
//       onClose();
//     } else if (setCurrentPage) {
//       setCurrentPage("login");
//     } else {
//       navigate(-1);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 relative">
//       <button
//         onClick={handleClose}
//         type="button"
//         className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
//         aria-label="Close form"
//       >
//         <X size={20} />
//       </button>

//       <h3 className="text-2xl font-bold text-gray-900 text-center">
//         Create an Account
//       </h3>
//       <p className="text-sm text-gray-600 mt-2 mb-6 text-center">
//         Join us today by entering your details below
//       </p>

//       <form onSubmit={handleSignUp} className="space-y-5">
//         <div className="space-y-4">
//           <Input
//             type="text"
//             value={fullName}
//             onChange={({ target }) => setFullName(target.value)}
//             label="Full Name"
//             placeholder="John"
//           />
//           <Input
//             type="email"
//             value={email}
//             onChange={({ target }) => setEmail(target.value)}
//             label="Email"
//             placeholder="example@example.com"
//           />
//           <Input
//             type="password"
//             value={password}
//             onChange={({ target }) => setPassword(target.value)}
//             label="Password"
//             placeholder="Min 8 characters"
//           />
//         </div>

//         {/* ✅ Error in red */}
//         {error && <p className="text-sm text-red-500">{error}</p>}

//         {/* ✅ Success in green */}
//         {success && <p className="text-sm text-green-600">{success}</p>}

//         <button
//           type="submit"
//           className="w-full py-3 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-white font-semibold rounded-lg shadow-md hover:from-black hover:to-black transition-all duration-300"
//         >
//           Sign Up
//         </button>

//         <p className="text-sm text-gray-700 text-center mt-4">
//           Already have an account?{" "}
//           <button
//             onClick={() => setCurrentPage && setCurrentPage("login")}
//             type="button"
//             className="text-[#FF9324] font-semibold hover:underline"
//           >
//             Log In
//           </button>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react'; 
import Input from "../../components/Inputs/input";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const SignUp = ({ setCurrentPage, onClose, updateUser }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 

  const navigate = useNavigate();

  // ✅ validation helpers
  const validateName = (name) => {
    const regex = /^[A-Za-z]{4,}(?: [A-Za-z]+)*$/; 
    return regex.test(name);
  };

  const validateEmail = (value) => {
    const regex = /^[A-Za-z][A-Za-z0-9._%+-]{3,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(value);
  };

  const validatePassword = (pwd) => {
    return pwd.length >= 8;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateName(fullName)) {
      setError("Full name must be at least 4 letters (no numbers/symbols)");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email (must start with letters & min 4 chars before @)");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);

        if (updateUser) updateUser(response.data);

        setSuccess("Successfully Registered 🎉");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Backend error 👉", error.response.data);
        setError(error.response.data.message || "Signup failed");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (setCurrentPage) {
      setCurrentPage("login");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 relative">
      <button
        onClick={handleClose}
        type="button"
        className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
        aria-label="Close form"
      >
        <X size={20} />
      </button>

      <h3 className="text-2xl font-bold text-gray-900 text-center">
        Create an Account
      </h3>
      <p className="text-sm text-gray-600 mt-2 mb-6 text-center">
        Join us today by entering your details below
      </p>

      <form onSubmit={handleSignUp} className="space-y-5">
        <div className="space-y-4">
          <Input
            type="text"
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
          />
          <Input
            type="text"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email"
            placeholder="example@example.com"
          />
          <Input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-white font-semibold rounded-lg shadow-md hover:from-black hover:to-black transition-all duration-300"
        >
          Sign Up
        </button>

        <p className="text-sm text-gray-700 text-center mt-4">
          Already have an account?{" "}
          <button
            onClick={() => setCurrentPage && setCurrentPage("login")}
            type="button"
            className="text-[#FF9324] font-semibold hover:underline"
          >
            Log In
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
