import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in localStorage
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    // ✅ For now we won’t fetch profile from backend
    // Just mark user as logged in with the token
    setUser({ token: accessToken });
    setLoading(false);
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;


// import { createContext, useState, useEffect } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { API_PATHS } from "../utils/apiPaths";

// export const UseContext = createContext();

// const UserProvider = ({ children }) =>{
//     const [user, setUser] = useState(null);
//     const [loading, setLoading]= useState(true);//new state to track loading

//     useEffect(() => {
//         if (user) return;

//         const accessToken = localStorage.getItem("token");
//         if(!accessToken){
//             setLoading(false);
//             return;
//         }

//         const fetchUser = async () =>{
//             try{
//                 const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
//                 setUser(response.data);
//             }catch(error){
//                 console.error("user not authenticated", error);
//                 clearUser();
//             }finally{
//                 setLoading(false)
//             }
//             };
//             fetchUser();
//     }, []);

//     const updateUser = (userData) =>{
//         setUser(userData);
//         localStorage.setItem("token", userData.token);
//         setLoading(false);
//     }
//     const clearUser = () =>{
//         setUser(null);
//         localStorage.removeItem("token")
//     };

//     return (
//         <UseContext.Provider value={{ user, loading, updateUser, clearUser }}>
//         {children}
//         </UseContext.Provider>
//     );
// };

// export default UserProvider;