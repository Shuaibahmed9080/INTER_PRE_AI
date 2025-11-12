import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileInfoCard from '../Cards/ProfileInfoCard';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { to: "/dashboard", label: "Home" },
    { to: "/contact", label: "Contact Us" },
    { to: "/resume", label: "Resume builder" },
    { to: "/softskill", label: "Softskill" },
    { to: "/mocktest", label: "Mock test" },
  ];
  return (
       <nav className="w-full bg-white shadow-md  top-1 left-1 z-40">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Logo / brand */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-lg font-bold text-gray-900 hover:text-[#FF9324] transition-colors duration-300">
            Shuaib
          </Link>

          {/* Desktop / Tablet nav - hidden on small screens */}
          <div className="hidden md:flex items-center gap-8 ml-6">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-gray-700 text-lg font-semibold hover:text-[#FF9324] transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Profile for md+ */}
        <div className="hidden md:flex items-center">
          <ProfileInfoCard />
        </div>

        {/* Mobile: hamburger button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9324] hover:bg-gray-100 transition"
          >
            {/* simple hamburger / X icon */}
            {!open ? (
              <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu (slide down) */}
      <div
        className={`md:hidden bg-white shadow-inner overflow-hidden transition-all duration-300 ease-out ${
          open ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-6 pt-4 pb-6 space-y-4">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)} // close menu on navigation
              className="block text-gray-800 text-base font-medium py-2 rounded-md hover:bg-gray-50 transition"
            >
              {l.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Show profile card in mobile menu */}
          <div className="pt-4">
            <ProfileInfoCard />
          </div>
        </div>
      </div>
    </nav>
  );
};
//     <div className="w-full bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         <div className="flex items-center gap-8">
//           <Link to="/dashboard">
//             <h2 className="text-lg font-bold text-gray-900 hover:text-[#FF9324] transition-colors duration-300">
//               Home
//             </h2>
//           </Link>
//           {/* ✅ Contact Us Link */}
//           <Link
//             to="/contact"
//             className="text-gray-700 text-lg font-bold hover:text-[#FF9324] transition-colors duration-300"
//           >
//             Contact Us
//           </Link>
//           <Link
//             to="/resume"
//             className="text-gray-700 text-lg font-bold hover:text-[#FF9324] transition-colors duration-300"
//           >
//             Resume builder
//           </Link>
//           <Link
//             to="/softskill"
//             className="text-gray-700 text-lg font-bold hover:text-[#FF9324] transition-colors duration-300"
//           >
//             Softskill
//           </Link>
//           <Link
//             to="/mocktest"
//             className="text-gray-700 text-lg font-bold hover:text-[#FF9324] transition-colors duration-300"
//           >
//             Mock test
//           </Link>
//         </div>
//         <ProfileInfoCard />
//       </div>
//     </div>
//   );
// };

export default Navbar;


// import React from 'react'
// import { Link } from 'react-router-dom'
// import ProfileInfoCard from '../Cards/ProfileInfoCard'
// const Navbar = () => {
//   return (
//     <div className="w-full bg-white shadow-md">
//   <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//     <Link to="/dashboard">
//       <h2 className="text-xl font-bold text-gray-900 hover:text-[#FF9324] transition-colors duration-300">
//         Interview Prep AI
//       </h2>
//     </Link>
//     <ProfileInfoCard />
//   </div>
// </div>

//   )
// }

// export default Navbar
//rafce
