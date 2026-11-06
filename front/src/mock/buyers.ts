import { Buyer } from '../types';

export const MOCK_BUYERS: Buyer[] = [
  { id: 'BUY-01', name: 'Heritage Foods Retail', type: 'Supermarket', phone: '+91 98401 11223', email: 'procurement@heritage.in', city: 'Hyderabad', state: 'Telangana', totalPurchases: 42, totalAmountSpent: 1850000, rating: 4.9 },
  { id: 'BUY-02', name: 'More Supermarket Hub', type: 'Supermarket', phone: '+91 98402 22334', email: 'agri@moresupermarkets.com', city: 'Bengaluru', state: 'Karnataka', totalPurchases: 38, totalAmountSpent: 1620000, rating: 4.8 },
  { id: 'BUY-03', name: 'Spencer Fresh Mart', type: 'Supermarket', phone: '+91 98403 33445', email: 'fresh@spencer.in', city: 'Chennai', state: 'Tamil Nadu', totalPurchases: 29, totalAmountSpent: 1240000, rating: 4.7 },
  { id: 'BUY-04', name: 'ITC Agri Business Division', type: 'Food Processor', phone: '+91 98404 44556', email: 'spices@itc.in', city: 'Guntur', state: 'Andhra Pradesh', totalPurchases: 65, totalAmountSpent: 4800000, rating: 5.0 },
  { id: 'BUY-05', name: 'MTR Foods Ltd', type: 'Food Processor', phone: '+91 98405 55667', email: 'sourcing@mtrfoods.com', city: 'Bengaluru', state: 'Karnataka', totalPurchases: 50, totalAmountSpent: 3900000, rating: 4.9 },
  { id: 'BUY-06', name: 'Tata Consumer Products', type: 'Food Processor', phone: '+91 98406 66778', email: 'pulses@tataconsumer.com', city: 'Kochi', state: 'Kerala', totalPurchases: 33, totalAmountSpent: 2750000, rating: 4.8 },
  { id: 'BUY-07', name: 'Deccan Fresh Wholesalers', type: 'Wholesaler', phone: '+91 98407 77889', email: 'trade@deccanfresh.org', city: 'Vijayawada', state: 'Andhra Pradesh', totalPurchases: 58, totalAmountSpent: 3200000, rating: 4.6 },
  { id: 'BUY-08', name: 'Warangal Grain Trading Co.', type: 'Wholesaler', phone: '+91 98408 88990', email: 'warangal@graintrade.in', city: 'Warangal', state: 'Telangana', totalPurchases: 40, totalAmountSpent: 2400000, rating: 4.5 },
  { id: 'BUY-09', name: 'Koyambedu Mega Market Traders', type: 'Wholesaler', phone: '+91 98409 99001', email: 'veggies@koyambedu.tn.gov', city: 'Chennai', state: 'Tamil Nadu', totalPurchases: 72, totalAmountSpent: 5100000, rating: 4.9 },
  { id: 'BUY-10', name: 'Malabar Spices & Extracts', type: 'Export Business', phone: '+91 98410 10101', email: 'export@malabarspices.com', city: 'Kozhikode', state: 'Kerala', totalPurchases: 22, totalAmountSpent: 3400000, rating: 4.9 },
  { id: 'BUY-11', name: 'Global Agri Global LLC', type: 'Export Business', phone: '+91 98411 20202', email: 'desk@globalagri.com', city: 'Visakhapatnam', state: 'Andhra Pradesh', totalPurchases: 19, totalAmountSpent: 4200000, rating: 4.8 },
  { id: 'BUY-12', name: 'Blinkit Quick Commerce Hub', type: 'Supermarket', phone: '+91 98412 30303', email: 'farm-direct@blinkit.com', city: 'Hyderabad', state: 'Telangana', totalPurchases: 85, totalAmountSpent: 3100000, rating: 4.9 },
  { id: 'BUY-13', name: 'Zepto Agri Direct', type: 'Supermarket', phone: '+91 98413 40404', email: 'sourcing@zepto.in', city: 'Bengaluru', state: 'Karnataka', totalPurchases: 90, totalAmountSpent: 3600000, rating: 4.8 },
  { id: 'BUY-14', name: 'BigBasket Organic Division', type: 'Supermarket', phone: '+91 98414 50505', email: 'organic@bigbasket.com', city: 'Hyderabad', state: 'Telangana', totalPurchases: 95, totalAmountSpent: 5800000, rating: 5.0 },
  { id: 'BUY-15', name: 'Coimbatore Cotton Mills Ltd', type: 'Food Processor', phone: '+91 98415 60606', email: 'procurement@coimbatorecotton.in', city: 'Coimbatore', state: 'Tamil Nadu', totalPurchases: 15, totalAmountSpent: 2900000, rating: 4.6 },
  { id: 'BUY-16', name: 'Nalgonda Rice Exporters Association', type: 'Export Business', phone: '+91 98416 70707', email: 'info@nalgondarice.org', city: 'Miryalaguda', state: 'Telangana', totalPurchases: 45, totalAmountSpent: 6200000, rating: 4.9 },
  { id: 'BUY-17', name: 'Mysuru Local Farmers Market Co-op', type: 'Local Market', phone: '+91 98417 80808', email: 'coop@mysurufarmers.org', city: 'Mysuru', state: 'Karnataka', totalPurchases: 31, totalAmountSpent: 890000, rating: 4.7 },
  { id: 'BUY-18', name: 'Rayalaseema Cold Storage & Trade', type: 'Wholesaler', phone: '+91 98418 90909', email: 'cold@rayalaseematrade.com', city: 'Anantapur', state: 'Andhra Pradesh', totalPurchases: 27, totalAmountSpent: 1750000, rating: 4.5 },
  { id: 'BUY-19', name: 'Wayanad Organic Spice Co-op', type: 'Export Business', phone: '+91 98419 01010', email: 'organic@wayanadspices.org', city: 'Kalpetta', state: 'Kerala', totalPurchases: 18, totalAmountSpent: 2100000, rating: 4.9 },
  { id: 'BUY-20', name: 'AP Civil Supplies Corporation', type: 'Wholesaler', phone: '+91 98420 12121', email: 'procurement@apcivilsupplies.gov.in', city: 'Vijayawada', state: 'Andhra Pradesh', totalPurchases: 110, totalAmountSpent: 9800000, rating: 4.8 }
];
