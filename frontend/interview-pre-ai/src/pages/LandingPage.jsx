// import React, { useState } from "react";
// import HERO_IMG from "../assets/hero-img.png";
// import { APP_FEATURES } from "../utils/data";
// import { useNavigate } from "react-router-dom";
// // import { LuSparkles } from 'react-icons/lu';
// import Modal from "../components/Modal";
// import Login from "../pages/Auth/Login";
// import SignUp from "../pages/Auth/SignUp";
// import { useContext } from "react";
// import { UserContext } from "../context/userContext";
// // import { set } from "mongoose";
// import ProfileInfoCard from "../components/Cards/ProfileInfoCard"; // Importing ProfileInfoCard component
// import { Sparkles } from "lucide-react";


// const LandingPage = () => {
//   const { user } = useContext(UserContext)
//   const navigate = useNavigate();
//   const [openAuthModal, setOpenAuthModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState("login");

//   const handleCTA = () => {
//     if(!user){
//       setOpenAuthModal(true);
//     }
//     else{
//     navigate("/dashboard");
//     }
//   };

//   return (
//     <>
//       <div className="w-full min-h-screen bg-[#FFFCEF] relative overflow-hidden">
//         {/* Decorative Blur Background */}
//         <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0" />

//         <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
//           {/* Header */}
//           <header className="flex justify-between items-center mb-16">
//             <div className="text-xl text-black font-bold">Interview Prep AI</div>
//             {user? <ProfileInfoCard /> : <button
//               className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-all duration-300 cursor-pointer"
//               onClick={() => setOpenAuthModal(true)}
//             >
//               Login / Sign Up
//             </button> }
//           </header>

//           {/* Hero Content */}
//           <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
//             {/* Text Section */}
//             <div className="flex-1 text-center lg:text-left">
//               <p className="uppercase text-[#FF9324] font-semibold tracking-wider flex items-center justify-center lg:justify-start gap-2">
//                 {/* <LuSparkles /> AI Powered */}
//                 <Sparkles className="w-4 h-4" />
//                 AI Powered
//               </p>
//               <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mt-4">
//                 Ace Interview with <br />
//                 <span className="text-[#FF9324]">AI-powered</span> Learning
//               </h1>
//               <p className="text-gray-700 mt-6 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
//                 Get role-specific questions, expand answers when you need them,
//                 dive deeper into concepts, and organize everything your way.
//                 From preparation to mastery — your ultimate interview toolkit is
//                 here.
//               </p>
//               <button
//                 className="mt-8 px-8 py-3 bg-[#FF9324] text-white font-semibold rounded-full hover:bg-black transition-all duration-300"
//                 onClick={handleCTA}
//               >
//                 Get Started
//               </button>
//             </div>

//             {/* Image Section */}
//             <div className="flex-1 flex justify-center lg:justify-end mt-8 lg:mt-16">
//               <img
//                 src={HERO_IMG}
//                 alt="Interview Prep AI"
//                 className="w-full max-w-md sm:max-w-lg lg:max-w-2xl drop-shadow-2xl"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="bg-white py-20">
//         <div className="container mx-auto px-4">
//           <section>
//             {/* Heading */}
//             <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">
//               Features That Make You Shine
//             </h2>

//             {/* Features Grid */}
//             <div className="space-y-12">
//               {/* First 3 cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {APP_FEATURES.slice(0, 3).map((feature) => (
//                   <div
//                     key={feature.id}
//                     className="bg-[#FFFCEF] rounded-2xl shadow-lg p-6 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
//                   >
//                     <h3 className="text-xl font-semibold text-[#FF9324] mb-4">
//                       {feature.title}
//                     </h3>
//                     <p className="text-gray-700 leading-relaxed">
//                       {feature.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Remaining 2 cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//                 {APP_FEATURES.slice(3).map((feature) => (
//                   <div
//                     key={feature.id}
//                     className="bg-[#FFFCEF] rounded-2xl shadow-lg p-6 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
//                   >
//                     <h3 className="text-xl font-semibold text-[#FF9324] mb-4">
//                       {feature.title}
//                     </h3>
//                     <p className="text-gray-700 leading-relaxed">
//                       {feature.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="bg-[#FFFCEF] py-6 text-center text-gray-600 text-sm">
//         Made with ❤️ by the Interview Prep AI Team
//       </div>

//       <Modal
//         isOpen={openAuthModal}
//         onClose={() => {
//           setOpenAuthModal(false);
//           setCurrentPage("login");
//         }}
//         hideHeader
//       >
//         <div>
//           {currentPage === "login" && (
//             <Login setCurrentPage={setCurrentPage} />
//           )}
//           {currentPage === "signup" && (
//             <SignUp setCurrentPage={setCurrentPage} />
//           )}
//         </div>
//       </Modal>

//     </>
//   );
// };



// export default LandingPage;
import React, { useState, useContext } from "react";
import HERO_IMG from "../assets/hero-img.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import { Sparkles } from "lucide-react";

const LandingPage = () => {
  const { user, updateUser } = useContext(UserContext); // ✅ get updateUser from context
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#FFFCEF] relative overflow-hidden">
        {/* Decorative Blur Background */}
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0" />

        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl text-black font-bold">Interview Prep AI</div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-all duration-300 cursor-pointer"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero Content */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
            {/* Text Section */}
            <div className="flex-1 text-center lg:text-left">
              <p className="uppercase text-[#FF9324] font-semibold tracking-wider flex items-center justify-center lg:justify-start gap-2">
                <Sparkles className="w-4 h-4" />
                AI Powered
              </p>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mt-4">
                Ace Interview with <br />
                <span className="text-[#FF9324]">AI-powered</span> Learning
              </h1>
              <p className="text-gray-700 mt-6 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery — your ultimate interview toolkit is
                here.
              </p>
              <button
                className="mt-8 px-8 py-3 bg-[#FF9324] text-white font-semibold rounded-full hover:bg-black transition-all duration-300"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>

            {/* Image Section */}
            <div className="flex-1 flex justify-center lg:justify-end mt-8 lg:mt-16">
              <img
                src={HERO_IMG}
                alt="Interview Prep AI"
                className="w-full max-w-md sm:max-w-lg lg:max-w-2xl drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <section>
            <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">
              Features That Make You Shine
            </h2>

            <div className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {APP_FEATURES.slice(0, 3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#FFFCEF] rounded-2xl shadow-lg p-6 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <h3 className="text-xl font-semibold text-[#FF9324] mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {APP_FEATURES.slice(3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#FFFCEF] rounded-2xl shadow-lg p-6 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <h3 className="text-xl font-semibold text-[#FF9324] mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#FFFCEF] py-6 text-center text-gray-600 text-sm">
        Made with ❤️ by the Interview Prep AI Team
      </div>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "signup" && (
            <SignUp
              setCurrentPage={setCurrentPage}
              onClose={() => setOpenAuthModal(false)} // ✅ pass close function
              updateUser={updateUser} // ✅ pass updateUser
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;

