// import { useContext } from "react";
// import { UserContext } from "../../context/userContext";
// import { useNavigate } from "react-router-dom";


// const ProfileInfoCard = () => {
//   const { user, clearUser } = useContext(UserContext)
//   const navigate = useNavigate();

//   const handlLogout = () => {
//     localStorage.clear();
//     clearUser();
//     navigate("/")
//   }
//   return (
//     user && (
//       <div className="flex items-center gap-4 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-white px-5 py-2.5 rounded-full shadow-md">
//         <div className="text-sm font-semibold">
//           {user.name || ""}
//         </div>
//         <button
//           onClick={handlLogout}
//           className="bg-white text-[#FF9324] font-semibold text-sm px-4 py-1.5 rounded-full hover:bg-black hover:text-white transition-all duration-300"
//         >
//           Logout
//         </button>
//       </div>


//     )
//   )
// }

// export default ProfileInfoCard;
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-4 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-white px-5 py-2.5 rounded-full shadow-md">
      <div className="text-sm font-semibold">
        {user?.name || "Guest"}
      </div>
      <button
        onClick={handleLogout}
        className="bg-white text-[#FF9324] font-semibold text-sm px-4 py-1.5 rounded-full hover:bg-black hover:text-white transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileInfoCard;
