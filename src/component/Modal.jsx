import React, { useEffect, useRef } from 'react';
import { X } from "lucide-react";

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  darkMode = false,
  title = '',
  size = 'default' // 'small', 'default', 'large', 'full'
}) => {
  const modalRef = useRef(null);
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-sm',
    default: 'max-w-md',
    large: 'max-w-2xl',
    responsive: 'max-w-sm sm:max-w-md lg:max-w-2xl xl:max-w-4xl',
    full: 'max-w-5xl'
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6
        transition-all duration-300 
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300
          ${isOpen ? 'opacity-60' : 'opacity-0'}
        `}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={`
          relative w-full ${sizeClasses[size]}
          transform transition-all duration-300 ease-out
          ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}
          ${darkMode ? 'bg-gray-800' : 'bg-white'}
          rounded-xl shadow-2xl
          flex flex-col
          max-h-[95vh] sm:max-h-[90vh]
        `}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`
            absolute right-2 top-2 sm:right-4 sm:top-4 p-1 sm:p-2 rounded-full
            transition-all duration-200 z-10
            ${darkMode 
              ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }
            focus:outline-none focus:ring-2 
            ${darkMode ? 'focus:ring-gray-500' : 'focus:ring-gray-300'}
          `}
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Title (if provided) */}
        {title && (
          <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
            <h2 
              id="modal-title"
              className={`text-lg sm:text-xl font-semibold pr-8 sm:pr-12
                ${darkMode ? 'text-white' : 'text-gray-900'}
              `}
            >
              {title}
            </h2>
          </div>
        )}

        {/* Content */}
        <div 
          className={`
            px-4 sm:px-6 ${title ? 'pt-0' : 'pt-4 sm:pt-6'} pb-4 sm:pb-6
            overflow-y-auto scrollbar-thin
            ${darkMode ? 'text-gray-200' : 'text-gray-600'}
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;