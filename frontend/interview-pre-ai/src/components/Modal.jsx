import React from "react";
import { X } from "lucide-react";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null; // ✅ Prevent rendering when closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      {/* Modal Content */}
      <div className="relative flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-lg">
        
        {/* Modal Header */}
        {!hideHeader && (
          <div className="flex justify-between items-center  py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
              onClick={onClose}
            >
              <X className="w-5 h-5" /> {/* ✅ Close icon */}
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
