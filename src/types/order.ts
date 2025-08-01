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

export interface OrderFormState
  extends Omit<Order, "orderDate" | "pickup_date">,
    user,
    years,
    branches {
  orderDate: string;
  pickup_date: string;
  discount: number;
  seller: string;
  cakeItems: CakeItem[];
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

export interface branches {
  id: string;
  name: string;
}
[];
export interface years {
  id: string;
  level: string;
  year: number;
  branch_id: string;
}
[];
export interface rooms {
  id: string;
  name: string;
  year_id: string;
  branch_id: string; // Add this property to match usage in GeneralInfoSection
}
[];

export interface user {
  fname: string;
  lastname: string;
  username: string;
}
