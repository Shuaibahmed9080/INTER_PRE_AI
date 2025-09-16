import React from "react";
import { X } from "lucide-react"; // ✅ Close icon

const Drawer = ({ isOpen, onClose, title, children, position = "right" }) => {
  const positionClass =
    position === "left"
      ? "left-0 transform transition-transform duration-300 ease-in-out"
      : "right-0 transform transition-transform duration-300 ease-in-out";

  const translateClass =
    position === "left"
      ? isOpen
        ? "translate-x-0"
        : "-translate-x-full"
      : isOpen
      ? "translate-x-0"
      : "translate-x-full";

  return (
    <div
      className={`
        fixed top-0 z-50 h-full w-[500px] bg-white shadow-xl
        ${positionClass} ${translateClass}
      `}
      tabIndex="-1"
      aria-labelledby="drawer-label"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h5 className="text-xl font-semibold text-gray-900">{title}</h5>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Body content */}
      <div className="p-6 overflow-y-auto h-[calc(100%-64px)] text-gray-700">
        {children}
      </div>
    </div>
  );
};

export default Drawer;


// import React from 'react'
// import { Sun } from "lucide-react";


// const Drawer = ({isOpen, onClose, title , children}) => {
//   return (
//     <div
//     className={`
//       ${isOpen ? 'translate-x-0' : 'translate-x-full'}
//       `}
//       tabIndex="-1"
//       aria-labelledby='drawer-right-label'
//     >
//       {/* Header */}
//       <div className=''>
//         <h5>
//           {title}
//         </h5>
//          {/* close button */}
//          <button
//          type='button'
//          onClick={onClose}
//          className=''
//          >
//           <Sun  className=''/>

//          </button>

//          {/* body content */}
//          <div className=''>
//            {children}
//          </div>
//       </div>
//     </div>
//   )
// }

// export default Drawer
