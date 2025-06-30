import React from 'react';

export const DrawerHeader = ({ children, onClose }) => {
  return (
    <div className="px-4 sm:px-6 py-6 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {children}
        </h2>
        {onClose && (
          <button
            type="button"
            className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={onClose}
          >
            <span className="sr-only">Close panel</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export const DrawerContent = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      {children}
    </div>
  );
};

export const DrawerFooter = ({ children }) => {
  return (
    <div className="px-4 py-4 sm:px-6 border-t border-gray-200 bg-gray-50">
      <div className="flex justify-end space-x-3">
        {children}
      </div>
    </div>
  );
};

export const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed inset-0 overflow-hidden ${isOpen ? 'z-50' : '-z-10'}`}
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 overflow-hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
        ></div>

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div
            className={`pointer-events-auto w-screen max-w-[800px] transform transition ease-in-out duration-500 sm:duration-700 ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
              <DrawerHeader onClose={onClose}>{title}</DrawerHeader>
              <div className="relative flex-1 overflow-y-auto">
                <DrawerContent>{children}</DrawerContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};