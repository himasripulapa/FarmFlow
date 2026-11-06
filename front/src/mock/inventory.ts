import { InventoryItem } from '../types';

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'INV-101', batchId: 'FF-2026-000101', cropName: 'Chilli', category: 'spice', locationName: 'GreenBazar Jubilee Hills', quantity: 450, unit: 'kg', qualityGrade: 'A', expiryDate: '2027-09-28', isLowStock: false, isNearExpiry: false, pricePerUnit: 185 },
  { id: 'INV-102', batchId: 'FF-2026-000102', cropName: 'Rice', category: 'grain', locationName: 'Miryalaguda Depot', quantity: 50, unit: 'quintal', qualityGrade: 'A', expiryDate: '2028-09-20', isLowStock: false, isNearExpiry: false, pricePerUnit: 4800 },
  { id: 'INV-103', batchId: 'FF-2026-000103', cropName: 'Mango', category: 'fruit', locationName: 'Vijayawada Express Truck', quantity: 200, unit: 'quintal', qualityGrade: 'A', expiryDate: '2026-10-25', isLowStock: false, isNearExpiry: true, pricePerUnit: 6500 },
  { id: 'INV-104', batchId: 'FF-2026-000104', cropName: 'Tomato', category: 'vegetable', locationName: 'More Supermarket Shelf', quantity: 85, unit: 'kg', qualityGrade: 'A', expiryDate: '2026-10-15', isLowStock: true, isNearExpiry: true, pricePerUnit: 35 },
  { id: 'INV-105', batchId: 'FF-2026-000105', cropName: 'Turmeric', category: 'spice', locationName: 'Salem Processing Center', quantity: 120, unit: 'quintal', qualityGrade: 'A', expiryDate: '2029-09-15', isLowStock: false, isNearExpiry: false, pricePerUnit: 14500 },
  { id: 'INV-106', batchId: 'FF-2026-000106', cropName: 'Banana', category: 'fruit', locationName: 'Palakkad Collection Warehouse', quantity: 1200, unit: 'kg', qualityGrade: 'B', expiryDate: '2026-10-20', isLowStock: false, isNearExpiry: true, pricePerUnit: 42 },
  { id: 'INV-107', batchId: 'FF-2026-000107', cropName: 'Groundnut', category: 'oilseed', locationName: 'Anantapur Storage Depot', quantity: 45, unit: 'quintal', qualityGrade: 'A', expiryDate: '2027-09-18', isLowStock: false, isNearExpiry: false, pricePerUnit: 6850 },
  { id: 'INV-108', batchId: 'FF-2026-000108', cropName: 'Cotton', category: 'cash crop', locationName: 'Warangal Ginning Depot', quantity: 80, unit: 'quintal', qualityGrade: 'A', expiryDate: '2028-09-22', isLowStock: false, isNearExpiry: false, pricePerUnit: 7400 }
];
