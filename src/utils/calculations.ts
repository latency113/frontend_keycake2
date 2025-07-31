// src/utils/calculations.ts
import type { CakeItem } from '../types';

/**
 * Calculates the total pounds and total amount for a single cake item.
 * @param item The cake item to calculate.
 * @returns The updated cake item with calculated totalPounds and totalAmount.
 */
export const calculateCakeItemTotals = (item: CakeItem): CakeItem => {
  const totalPounds = (item.qty1Pound * 1) + (item.qty2Pound * 2) +
                      (item.qty3Pound * 3) + (item.qty4Pound * 4) +
                      (item.qty5Pound * 5);
  // Assuming pieces are also priced per pound or have a standard price equivalent to pricePerPound
  const totalAmount = (totalPounds * item.pricePerPound) + (item.qtyPieces * item.pricePerPound); // Adjust if pieces have a separate fixed price
  return { ...item, totalPounds, totalAmount };
};

/**
 * Calculates the grand total amount from an array of cake items.
 * @param items An array of cake items.
 * @returns The sum of totalAmount for all items.
 */
export const calculateGrandTotal = (items: CakeItem[]): number => {
  return items.reduce((sum, item) => sum + item.totalAmount, 0);
};

/**
 * Calculates the net payable amount after discount.
 * @param grandTotal The total amount before discount.
 * @param discount The discount amount.
 * @returns The net payable amount.
 */
export const calculateNetPayable = (grandTotal: number, discount: number): number => {
  return grandTotal - discount;
};

/**
 * Calculates the remaining balance.
 * @param netPayable The amount payable after discount.
 * @param amountReceived The amount received from the customer.
 * @returns The remaining balance (positive if more is due, negative if overpaid).
 */
export const calculateRemainingBalance = (netPayable: number, amountReceived: number): number => {
  return netPayable - amountReceived;
};