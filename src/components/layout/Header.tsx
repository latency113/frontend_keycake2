// src/components/layout/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="bg-blue-600 text-white p-3 rounded-t-lg shadow-md flex justify-between items-center text-sm">
      <h1 className="text-lg font-bold">NVC Cake Program V.4</h1>
      <div className="flex items-center space-x-4">
        <span className="text-md">04 นายชัย สถานนวล</span>
        {/* Placeholder for icons, e.g., using an actual icon library or SVG */}
        <div className="flex space-x-2">
          {/* <img src="/path/to/save-icon.svg" alt="Save" className="h-5 w-5 cursor-pointer" /> */}
          {/* <img src="/path/to/exit-icon.svg" alt="Exit" className="h-5 w-5 cursor-pointer" /> */}
          <span className="text-xl">💾</span> {/* Placeholder for Save Icon */}
          <span className="text-xl">✖️</span> {/* Placeholder for Exit Icon */}
        </div>
      </div>
    </div>
  );
};

export default Header;