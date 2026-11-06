export type UserRole =
  | 'farmer'
  | 'collectionCenter'
  | 'distributor'
  | 'retailer'
  | 'consumer'
  | 'admin';

export type CropCategory =
  | 'grain'
  | 'vegetable'
  | 'fruit'
  | 'pulse'
  | 'spice'
  | 'oilseed'
  | 'cash crop';

export type BatchStatus =
  | 'Created'
  | 'Harvested'
  | 'Quality Checked'
  | 'At Collection Center'
  | 'In Transit'
  | 'At Distributor'
  | 'At Retailer'
  | 'Sold'
  | 'Rejected'
  | 'Expired';

export type StageName =
  | 'farmer'
  | 'harvest'
  | 'collectionCenter'
  | 'distributor'
  | 'retailer'
  | 'consumer';

export interface LocationPoint {
  name: string;
  lat: number;
  lng: number;
}

export interface StageHistoryItem {
  stage: StageName;
  handlerName: string;
  handlerRole: UserRole;
  location: LocationPoint;
  timestamp: string;
  notes?: string;
  temperature?: number;
  humidity?: number;
  status: BatchStatus;
}

export interface FarmerProfile {
  id: string;
  name: string;
  village: string;
  district: string;
  state: string;
  phone: string;
  avatarUrl?: string;
  farmSizeAcres?: number;
  experienceYears?: number;
  bio?: string;
}

export interface BatchRating {
  id: string;
  rating: number; // 1 to 5
  comment: string;
  userLocation: string;
  date: string;
}

export interface Batch {
  batchId: string; // e.g. FF-2026-000123
  crop: {
    name: string;
    variety: string;
    category: CropCategory;
    emoji?: string;
  };
  farmer: FarmerProfile;
  harvestDate: string;
  quantity: number;
  unit: 'kg' | 'quintal' | 'tonne';
  qualityGrade: 'A' | 'B' | 'C';
  qualityNotes: string;
  photoUrl?: string;
  currentLocation: LocationPoint;
  status: BatchStatus;
  pricePerUnit: number; // in INR ₹
  organic: boolean;
  moisture: number; // percentage %
  expiryDate: string;
  stageHistory: StageHistoryItem[];
  qrCode: string;
  carbonFootprint: {
    distanceKm: number;
    co2SavedKg: number;
  };
  ratings?: BatchRating[];
  costBreakdown?: {
    farmerSharePercent: number; // e.g. 62%
    logisticsPercent: number;   // e.g. 18%
    retailerMarginPercent: number; // e.g. 20%
  };
  storageCondition?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  village?: string;
  district?: string;
  state?: string;
  avatarUrl?: string;
  businessName?: string;
  centerName?: string;
}

export interface Buyer {
  id: string;
  name: string;
  type: 'Wholesaler' | 'Supermarket' | 'Food Processor' | 'Export Business' | 'Local Market';
  phone: string;
  email: string;
  city: string;
  state: string;
  totalPurchases: number;
  totalAmountSpent: number;
  rating: number;
}

export interface Transaction {
  id: string;
  batchId: string;
  cropName: string;
  fromUser: string;
  toUser: string;
  quantity: number;
  unit: string;
  totalAmount: number;
  status: 'Paid' | 'Pending' | 'Failed';
  date: string;
  paymentMethod?: 'UPI' | 'Direct Transfer' | 'Bank Guarantee' | 'Cash';
}

export interface InventoryItem {
  id: string;
  batchId: string;
  cropName: string;
  category: CropCategory;
  locationName: string;
  quantity: number;
  unit: string;
  qualityGrade: 'A' | 'B' | 'C';
  expiryDate: string;
  isLowStock: boolean;
  isNearExpiry: boolean;
  pricePerUnit: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'alert' | 'success';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface MandiPrice {
  id: string;
  crop: string;
  mandi: string;
  state: string;
  pricePerQuintal: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  minPrice: number;
  maxPrice: number;
}

export interface WeatherInfo {
  tempC: number;
  condition: string;
  humidity: number;
  windSpeedKm: number;
  location: string;
  forecast: string;
  advisory: string;
}
