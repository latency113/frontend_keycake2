// src/components/form/OrderForm.tsx
import React, { useState } from 'react';
import type { OrderFormState, CakeItem, InputChangeEvent } from '../../types';
import { calculateGrandTotal, calculateNetPayable, calculateRemainingBalance, calculateCakeItemTotals } from '../../utils/calculations';

import GeneralInfoSection from './GeneralInfoSection';
import CakeDetailsTable from './CakeDetailTable';
import SummarySection from './SummarySection';

const initialCakeItems: CakeItem[] = [
  { id: '1', name: 'เมล็ดเค้ก', pricePerPound: 190, qty1Pound: 0, qty2Pound: 0, qty3Pound: 0, qty4Pound: 0, qty5Pound: 0, qtyPieces: 0, totalPounds: 0, totalAmount: 0 },
  { id: '2', name: 'แยมเค้ก', pricePerPound: 200, qty1Pound: 0, qty2Pound: 0, qty3Pound: 0, qty4Pound: 0, qty5Pound: 0, qtyPieces: 0, totalPounds: 0, totalAmount: 0 },
  { id: '3', name: 'กาแฟ', pricePerPound: 200, qty1Pound: 0, qty2Pound: 0, qty3Pound: 0, qty4Pound: 0, qty5Pound: 0, qtyPieces: 0, totalPounds: 0, totalAmount: 0 },
  { id: '4', name: 'ช็อกโกแลต', pricePerPound: 250, qty1Pound: 0, qty2Pound: 0, qty3Pound: 0, qty4Pound: 0, qty5Pound: 0, qtyPieces: 0, totalPounds: 0, totalAmount: 0 },
];

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState<OrderFormState>(() => {
    const initialItemsWithCalculations = initialCakeItems.map(calculateCakeItemTotals);
    return {
      bookNo: '',
      orderNo: '',
      type: 'chilled', // Default
      customerName: '',
      fName: '',
      lastName: '',
      classLevel: '',
      room: '',
      department: '',
      phoneNumber: '',
      advisorTeacher: '',
      saleDate: new Date().toISOString().split('T')[0], // Current date
      cakeItems: initialItemsWithCalculations,
      discount: 0,
      amountReceived: 0,
      seller: 'A', // Default seller
    };
  });

  const handleGeneralInfoChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCakeQuantityChange = (cakeId: string, field: keyof CakeItem, value: number) => {
    setFormData(prev => {
      const updatedCakeItems = prev.cakeItems.map(item => {
        if (item.id === cakeId) {
          // Update quantity and then recalculate totals for this specific item
          const updatedItem = calculateCakeItemTotals({ ...item, [field]: value });
          return updatedItem;
        }
        return item;
      });
      return { ...prev, cakeItems: updatedCakeItems };
    });
  };

  const grandTotal = calculateGrandTotal(formData.cakeItems);
  const netPayable = calculateNetPayable(grandTotal, formData.discount);
  const remainingBalance = calculateRemainingBalance(netPayable, formData.amountReceived);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Here you would typically send data to a backend API
    // Example: fetch('/api/orders', { method: 'POST', body: JSON.stringify(formData) })
    alert('Form submitted! Check console for data.');
  };

  const handleCancel = () => {
    // Reset form to initial state
    const resetItems = initialCakeItems.map(calculateCakeItemTotals);
    setFormData({
      bookNo: '',
      orderNo: '',
      type: 'chilled',
      customerName: '',
      fName: '',
      lastName: '',
      classLevel: '',
      room: '',
      department: '',
      phoneNumber: '',
      advisorTeacher: '',
      saleDate: new Date().toISOString().split('T')[0],
      cakeItems: resetItems,
      discount: 0,
      amountReceived: 0,
      seller: 'A',
    });
    alert('Form cancelled and reset.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">บันทึกข้อมูล</h2>

      <GeneralInfoSection formData={formData} handleChange={handleGeneralInfoChange} />

      <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">รายละเอียดเค้ก</h3>
      <CakeDetailsTable cakeItems={formData.cakeItems} onQuantityChange={handleCakeQuantityChange} />

      <div className="flex justify-center mt-4">
        {/* Shopping cart icon placeholder */}
        <img src="/assets/icons/cart-icon.png" alt="Cart" className="h-10 w-10 cursor-pointer opacity-50 hover:opacity-100" />
      </div>

      <SummarySection
        grandTotal={grandTotal}
        discount={formData.discount}
        netPayable={netPayable}
        amountReceived={formData.amountReceived}
        remainingBalance={remainingBalance}
        onDiscountChange={handleGeneralInfoChange} // Reusing for discount/amountReceived as they are direct input fields
        onAmountReceivedChange={handleGeneralInfoChange}
        seller={formData.seller}
      />

      <div className="flex justify-end space-x-4 mt-8">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          ยกเลิก
        </button>
        <button
          type="submit"
          className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          บันทึก
        </button>
      </div>
    </form>
  );
};

export default OrderForm;