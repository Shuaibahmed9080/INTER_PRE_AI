import React from 'react';
import { Link } from 'react-router-dom';
import ProfileInfoCard from '../Cards/ProfileInfoCard';

const Navbar = () => {
  return (
    <div className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/dashboard">
            <h2 className="text-lg font-bold text-gray-900 hover:text-[#FF9324] transition-colors duration-300">
              Home
            </h2>
          </Link>
          {/* ✅ Contact Us Link */}
          <Link
            to="/contact"
            className="text-gray-700 text-lg font-bold hover:text-[#FF9324] transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
        <ProfileInfoCard />
      </div>
    </div>
  );
};

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
