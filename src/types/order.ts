// src/types/order.ts

export interface Product {
  name: string;
  price: number;
  unit_id: string;
  unit?: {
    name_th: string;
    name_en: string;
  };
}

export interface OrderItem {
  product_id: string;
  pound: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  customerName: string;
  room_id?: string;
  team_id?: string;
  orderDate: Date;
  totalPrice: number;
  book_number: number;
  number: number;
  phone: string;
  pickup_date: Date;
  depository?: string;
  advisor: string;
  orderItems: OrderItem[];
  branch_id?: string;
  year_id?: string;
}

export interface OrderFormState extends Omit<Order, 'orderDate' | 'pickup_date'> {
  orderDate: string;
  pickup_date: string;
  discount: number;
  amountReceived: number;
  seller: string;
  cakeItems: CakeItem[];
  branch_id?: string;
  year_id?: string;
}

export interface CakeItem {
  id: string;
  name: string;
  pricePerPound: number;
  qty1Pound: number;
  qty2Pound: number;
  qty3Pound: number;
  qty4Pound: number;
  qty5Pound: number;
  qtyPieces: number;
  totalPounds: number;
  totalAmount: number;
}
