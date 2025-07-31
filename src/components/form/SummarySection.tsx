// src/components/form/SummarySection.tsx
import React from 'react';
import InputField from '../common/InputField';
import type { InputChangeEvent } from '../../types';

interface SummarySectionProps {
  grandTotal: number;
  discount: number;
  netPayable: number;
  amountReceived: number;
  remainingBalance: number;
  onDiscountChange: (e: InputChangeEvent) => void;
  onAmountReceivedChange: (e: InputChangeEvent) => void;
  seller: string;
}

const SummarySection: React.FC<SummarySectionProps> = ({
  grandTotal,
  discount,
  netPayable,
  remainingBalance,
  onDiscountChange,
  seller,
}) => {
  return (
    <div className="mt-8 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 items-end">
      <div className="md:col-span-2 flex ">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-gray-700">รวม</span>
          <span className="text-xl font-bold text-blue-700 w-32 text-right">
            {grandTotal.toFixed(2)}
          </span>
          <span className="text-sm font-bold text-gray-700">บาท</span>
        </div>
      </div>

      <div className="md:col-span-2 flex items-center  text-orange-600 font-semibold mb-2">
        <span>ยอดเงินได้จำปอนด์ละ 100 บาท</span>
      </div>

      <div className="flex items-center  md:col-start-2">
        <label htmlFor="discount" className="text-sm font-medium text-gray-700 mr-2">
          ส่วนลด (10 X)
        </label>
        <InputField
          label="ส่วนลด (10 X)"
          name="discount"
          value={discount}
          onChange={onDiscountChange}
          type="number"
          min={0}
          className="flex-shrink-0 w-24 mb-0"
          inputClassName="p-2 text-right"
          labelClassName="hidden" // Hide label as it's inline
        />
      </div>

      <div className="flex items-center  md:col-start-2">
        <label htmlFor="netPayable" className="text-sm font-medium text-gray-700 mr-2">
          สุทธิที่จ่าย
        </label>
        <div className="w-24 text-right p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-semibold">
          {netPayable.toFixed(2)}
        </div>
      </div>

      <div className="flex items-center  md:col-start-2">
        <label htmlFor="remainingBalance" className="text-sm font-medium text-gray-700 mr-2">
          ชำระเพิ่มเติม
        </label>
        <div className={`w-24 text-right p-2 border border-gray-300 rounded-md bg-gray-100 font-semibold ${remainingBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
          {remainingBalance.toFixed(2)}
        </div>
      </div>

      <div className="md:col-start-2 flex items-center  mt-4">
        <label htmlFor="seller" className="text-sm font-medium text-gray-700 mr-2">
          ผู้ขายเค้ก
        </label>
        <InputField
          label="ผู้ขายเค้ก"
          name="seller"
          value={seller}
          onChange={() => {}} // Seller might be read-only or set by system
          className="flex-shrink-0 w-24 mb-0"
          inputClassName="p-2 bg-gray-100 text-center font-medium"
          labelClassName="hidden"
          type="text"
        />
      </div>
    </div>
  );
};

export default SummarySection;