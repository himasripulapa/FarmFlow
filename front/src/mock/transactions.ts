import { Transaction } from '../types';

export const generateMockTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const crops = ['Chilli', 'Rice', 'Mango', 'Tomato', 'Turmeric', 'Banana', 'Groundnut', 'Cotton', 'Coconut', 'Maize'];
  const parties = [
    { from: 'Swathi (Farmer)', to: 'Guntur Collection Center' },
    { from: 'Guntur Collection Center', to: 'Krishna Agri Logistics' },
    { from: 'Krishna Agri Logistics', to: 'GreenBazar Retail Jubilee Hills' },
    { from: 'Venkat Rao (Farmer)', to: 'Miryalaguda Depot' },
    { from: 'Miryalaguda Depot', to: 'BigBasket Wholesale Hub' },
    { from: 'Karthik Ramasamy (Farmer)', to: 'Salem Spice Board' },
    { from: 'Salem Spice Board', to: 'ITC Agri Business' },
    { from: 'Murugan Selvam (Farmer)', to: 'Pollachi Express Hub' },
    { from: 'Subramanian Swamy (Farmer)', to: 'Madurai Hub' }
  ];

  for (let i = 1; i <= 105; i++) {
    const party = parties[i % parties.length];
    const crop = crops[i % crops.length];
    const qty = (i * 18) % 500 + 20;
    const rate = (i * 45) % 300 + 35;
    const amount = qty * rate * 10;
    const status: Transaction['status'] = i % 12 === 0 ? 'Pending' : (i % 25 === 0 ? 'Failed' : 'Paid');
    const methods: Transaction['paymentMethod'][] = ['UPI', 'Direct Transfer', 'Bank Guarantee', 'Cash'];

    transactions.push({
      id: `TXN-2026-${1000 + i}`,
      batchId: `FF-2026-000${(i % 40) + 101}`,
      cropName: crop,
      fromUser: party.from,
      toUser: party.to,
      quantity: qty,
      unit: i % 3 === 0 ? 'quintal' : 'kg',
      totalAmount: amount,
      status,
      date: `2026-09-${(i % 28) + 1}`,
      paymentMethod: methods[i % methods.length]
    });
  }

  return transactions;
};

export const MOCK_TRANSACTIONS = generateMockTransactions();
