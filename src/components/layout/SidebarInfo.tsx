// src/components/layout/SidebarInfo.tsx
import React from 'react';

import { departments } from '../../data/department-data';

const SidebarInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
        ข้อแนะนำและบริการ
      </h2>

      <div>
        <h3 className="font-bold text-gray-700 mb-2">แผนกทั้งหมด</h3>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          {departments.map((dept, index) => (
            <li key={index}>{dept}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarInfo;