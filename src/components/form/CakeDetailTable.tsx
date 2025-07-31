// src/components/form/CakeDetailsTable.tsx
import React from 'react';
import type { CakeItem } from '../../types';
import { calculateCakeItemTotals } from '../../utils/calculations';

interface CakeDetailsTableProps {
  cakeItems: CakeItem[];
  onQuantityChange: (cakeId: string, field: keyof CakeItem, value: number) => void;
}

const CakeDetailsTable: React.FC<CakeDetailsTableProps> = ({ cakeItems, onQuantityChange }) => {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 custom-table">
        <thead className="bg-blue-100">
          <tr>
            <th rowSpan={2} className="px-3 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r">
              เมื่อเลือกราคา
            </th>
            <th rowSpan={2} className="px-3 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r">
              ราคาต่อปอนด์
            </th>
            <th colSpan={6} className="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-r">
              จำนวนชิ้น / ขนาดปอนด์
            </th>
            <th rowSpan={2} className="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase tracking-wider border-r">
              รวม <br /> (ปอนด์)
            </th>
            <th rowSpan={2} className="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              รวมเงิน
            </th>
          </tr>
          <tr>
            <th className="px-2 py-1 text-center text-xs font-medium text-gray-600 uppercase border-r">
              1 ปอนด์
            </th>
            <th className="px-2 py-1 text-center text-xs font-medium text-gray-600 uppercase border-r">
              2 ปอนด์
            </th>
            <th className="px-2 py-1 text-center text-xs font-medium text-gray-600 uppercase border-r">
              3 ปอนด์
            </th>
            <th className="px-2 py-1 text-center text-xs font-medium text-gray-600 uppercase border-r">
              4 ปอนด์
            </th>
            <th className="px-2 py-1 text-center text-xs font-medium text-gray-600 uppercase border-r">
              5 ปอนด์
            </th>
            <th className="px-2 py-1 text-center text-xs font-medium text-gray-600 uppercase border-r">
              ชิ้น
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cakeItems.map((item) => {
            const calculatedItem = calculateCakeItemTotals(item); // Ensure totals are always up-to-date

            return (
              <tr key={item.id}>
                <td className="font-medium text-gray-900 border-r">
                  {item.name}
                </td>
                <td className="text-gray-500 border-r text-right">
                  {item.pricePerPound.toFixed(2)}
                </td>
                {/* Quantity inputs */}
                {[1, 2, 3, 4, 5].map(pound => (
                  <td key={`qty-${item.id}-${pound}p`} className="border-r">
                    <input
                      type="number"
                      min="0"
                      className="w-full text-center text-sm border border-gray-300 rounded-md p-1 focus:ring-blue-500 focus:border-blue-500"
                      value={item[`qty${pound}Pound` as keyof CakeItem] as number}
                      onChange={(e) => onQuantityChange(item.id, `qty${pound}Pound` as keyof CakeItem, parseInt(e.target.value) || 0)}
                    />
                  </td>
                ))}
                <td className="border-r">
                  <input
                    type="number"
                    min="0"
                    className="w-full text-center text-sm border border-gray-300 rounded-md p-1 focus:ring-blue-500 focus:border-blue-500"
                    value={item.qtyPieces}
                    onChange={(e) => onQuantityChange(item.id, 'qtyPieces', parseInt(e.target.value) || 0)}
                  />
                </td>
                <td className="text-gray-500 border-r text-center font-medium">
                  {calculatedItem.totalPounds.toFixed(1)}
                </td>
                <td className="text-gray-700 text-center font-bold">
                  {calculatedItem.totalAmount.toFixed(2)}
                </td>
              </tr>
            );
          })}
          {/* Total Row for the entire table */}
          <tr>
            <td colSpan={9} className="text-right font-bold text-gray-800 border-r bg-blue-50">
              รวม
            </td>
            <td className="text-center font-bold text-blue-700 bg-blue-50">
              {cakeItems.reduce((sum, item) => calculateCakeItemTotals(item).totalAmount + sum, 0).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CakeDetailsTable;