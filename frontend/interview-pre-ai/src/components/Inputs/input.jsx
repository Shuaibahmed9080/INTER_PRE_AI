import React, { useState } from "react";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Eye, EyeOff } from "lucide-react";

const Input = ({ value, onChange, label, placeholder, type }) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
  return (
  <div>
    <label className="text-[13px] text-slate-800">{label}</label>
    <div className="flex items-center w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-[#FF9324] focus-within:border-[#FF9324]">
      <input
        type={type == "password" ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
        value={value}
        onChange={(e) => onChange(e)}
      />
      {type === "password" && (
        <>
          {showPassword ? (
            <Eye
              size={22}
              className="text-[#FF9324] cursor-pointer"
              onClick={() => toggleShowPassword()}
            />
          ) : (
            <EyeOff
              size={22}
              className="text-slate-400 cursor-pointer"
              onClick={() => toggleShowPassword()}
            />
          )}
        </>
      )}
    </div>
  </div>
);
}
export default Input;