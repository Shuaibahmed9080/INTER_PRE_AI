import React from 'react'
import { Link } from 'react-router-dom'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
const Navbar = () => {
  return (
    <div className="w-full bg-white shadow-md">
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
    <Link to="/dashboard">
      <h2 className="text-xl font-bold text-gray-900 hover:text-[#FF9324] transition-colors duration-300">
        Interview Prep AI
      </h2>
    </Link>
    <ProfileInfoCard />
  </div>
</div>

  )
}

export default Navbar
//rafce
