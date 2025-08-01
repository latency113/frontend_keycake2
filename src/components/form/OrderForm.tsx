// src/components/form/OrderForm.tsx
import React, { useState, useEffect } from 'react';
import type { OrderFormState, CakeItem, InputChangeEvent } from '../../types';
import { calculateGrandTotal, calculateNetPayable, calculateRemainingBalance, calculateCakeItemTotals } from '../../utils/calculations';
import { createOrder, getBranchs, getYears } from '../../utils/api';

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
    return {
      customerName: "",
      room_id: "",
      team_id: "",
      orderDate: new Date().toISOString().split('T')[0],
      totalPrice: 0,
      book_number: 0,
      number: 0,
      phone: "",
      pickup_date: new Date().toISOString().split('T')[0],
      depository: "",
      advisor: "",
      orderItems: [],
      cakeItems: initialCakeItems,
      discount: 0,
      amountReceived: 0,
      seller: ""
    };
  });
  const [branches, setBranches] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const branchesData = await getBranchs();
        const yearsData = await getYears();
        setBranches(branchesData);
        setYears(yearsData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Transform cake items into order items
      const orderItems = formData.cakeItems
        .filter(item => item.totalAmount > 0)
        .map(item => ({
          product_id: item.id,
          pound: item.totalPounds,
          quantity: item.qty1Pound + item.qty2Pound + item.qty3Pound + item.qty4Pound + item.qty5Pound + item.qtyPieces,
          unitPrice: item.pricePerPound,
          subtotal: item.totalAmount
        }));

      // Prepare order data
      const orderData = {
        ...formData,
        orderItems,
        totalPrice: grandTotal
      };

      // Send to API
      const response = await createOrder(orderData);
      console.log('Order created successfully:', response);
      alert('คำสั่งซื้อถูกบันทึกเรียบร้อยแล้ว');
      
      // Reset form after successful submission
      handleCancel();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกคำสั่งซื้อ กรุณาลองใหม่อีกครั้ง');
    }
  };

  const handleCancel = () => {
    // Reset form to initial state
    setFormData({
      customerName: "",
      room_id: "",
      team_id: "",
      orderDate: new Date().toISOString().split('T')[0],
      totalPrice: 0,
      book_number: 0,
      number: 0,
      phone: "",
      pickup_date: new Date().toISOString().split('T')[0],
      depository: "",
      advisor: "",
      orderItems: [],
      cakeItems: initialCakeItems.map(calculateCakeItemTotals),
      discount: 0,
      amountReceived: 0,
      seller: ""
    });
    alert('Form cancelled and reset.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">บันทึกข้อมูล</h2>

      <GeneralInfoSection formData={formData} handleChange={handleGeneralInfoChange} branches={branches} years={years} />

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
