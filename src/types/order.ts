// src/types/order.ts

export interface CakeItem {
  id: string; // Unique ID for React keys
  name: string;
  pricePerPound: number;
  qty1Pound: number;
  qty2Pound: number;
  qty3Pound: number;
  qty4Pound: number;
  qty5Pound: number;
  qtyPieces: number;
  totalPounds: number; // Calculated based on qtyPound fields
  totalAmount: number; // Calculated based on totalPounds and qtyPieces
}

export type OrderType = 'frozen' | 'chilled' | 'notChilled';

export interface OrderFormState {
  bookNo: string;
  orderNo: string;
  type: OrderType;
  customerName: string; // ชื่อแขก/ชื่อร้าน
  fName: string; // ชื่อ
  lastName:string; // นามสกุล
  classLevel: string; // ระดับชั้น
  room: string;
  department?: string; // แผนก
  phoneNumber: string; // เบอร์โทรศัพท์
  advisorTeacher: string; // ครูที่ปรึกษา
  saleDate: string; // วันที่ขายเค้ก (YYYY-MM-DD)
  cakeItems: CakeItem[];
  discount: number; // ส่วนลด
  amountReceived: number; // ยอดเงินเข้า
  seller: string; // ผู้ขายเค้ก
}