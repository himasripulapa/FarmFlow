import { Batch } from '../types';
import { MOCK_FARMERS } from './farmers';

export const MOCK_BATCHES: Batch[] = [
  {
    batchId: 'FF-2026-000101',
    crop: { name: 'Chilli', variety: 'Guntur Sannam S4', category: 'spice', emoji: '🌶️' },
    farmer: MOCK_FARMERS[0], // Swathi
    harvestDate: '2026-09-28',
    quantity: 1500,
    unit: 'kg',
    qualityGrade: 'A',
    qualityNotes: 'High capsaicin content (0.45%), bright red color, 9.2% moisture level.',
    photoUrl: 'https://images.unsplash.com/photo-1588252303782-7ee958478440?auto=format&fit=crop&w=600&q=80',
    currentLocation: { name: 'GreenBazar Supermarket Jubilee Hills', lat: 17.4319, lng: 78.4072 },
    status: 'At Retailer',
    pricePerUnit: 185,
    organic: true,
    moisture: 9.2,
    expiryDate: '2027-09-28',
    carbonFootprint: { distanceKm: 285, co2SavedKg: 42 },
    costBreakdown: { farmerSharePercent: 64, logisticsPercent: 16, retailerMarginPercent: 20 },
    ratings: [
      { id: 'r1', rating: 5, comment: 'Authentic Guntur pungency! Great organic aroma.', userLocation: 'Hyderabad', date: '2026-10-04' },
      { id: 'r2', rating: 4.8, comment: 'Crisp texture and clean packaging.', userLocation: 'Secunderabad', date: '2026-10-05' }
    ],
    qrCode: 'FF-2026-000101',
    stageHistory: [
      { stage: 'farmer', handlerName: 'Swathi', handlerRole: 'farmer', location: { name: 'Reddy Farms, Guntur', lat: 16.3067, lng: 80.4365 }, timestamp: '2026-09-28T07:30:00Z', notes: 'Harvested early morning, sun-dried on raised polythene sheets.', status: 'Harvested' },
      { stage: 'collectionCenter', handlerName: 'Anand Kumar', handlerRole: 'collectionCenter', location: { name: 'Tenali Agri Hub #1', lat: 16.243, lng: 80.6405 }, timestamp: '2026-09-29T11:15:00Z', notes: 'Grade A verified. Weight 1500kg confirmed.', status: 'Quality Checked', temperature: 24, humidity: 55 },
      { stage: 'distributor', handlerName: 'Vikram Express Logistics', handlerRole: 'distributor', location: { name: 'Vijayawada Logistics Depot', lat: 16.5062, lng: 80.648 }, timestamp: '2026-10-01T09:00:00Z', notes: 'Loaded onto refrigerated truck AP-16-TX-9988.', status: 'In Transit', temperature: 21 },
      { stage: 'retailer', handlerName: 'Priya Sharma', handlerRole: 'retailer', location: { name: 'GreenBazar Jubilee Hills', lat: 17.4319, lng: 78.4072 }, timestamp: '2026-10-03T14:20:00Z', notes: 'Stock received & stacked on organic spice shelf.', status: 'At Retailer' }
    ]
  },
  {
    batchId: 'FF-2026-000102',
    crop: { name: 'Rice', variety: 'Sona Masoori Organic', category: 'grain', emoji: '🌾' },
    farmer: MOCK_FARMERS[1], // Venkat Rao
    harvestDate: '2026-09-20',
    quantity: 50,
    unit: 'quintal',
    qualityGrade: 'A',
    qualityNotes: 'Aged 12 months grain, zero broken rice, moisture 11.5%.',
    photoUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    currentLocation: { name: 'Miryalaguda Collection Depot', lat: 16.8667, lng: 79.5667 },
    status: 'At Collection Center',
    pricePerUnit: 4800,
    organic: true,
    moisture: 11.5,
    expiryDate: '2028-09-20',
    carbonFootprint: { distanceKm: 45, co2SavedKg: 18 },
    costBreakdown: { farmerSharePercent: 70, logisticsPercent: 12, retailerMarginPercent: 18 },
    qrCode: 'FF-2026-000102',
    stageHistory: [
      { stage: 'farmer', handlerName: 'Venkat Rao', handlerRole: 'farmer', location: { name: 'Miryalaguda Paddy Fields', lat: 16.8667, lng: 79.5667 }, timestamp: '2026-09-20T08:00:00Z', notes: 'Harvested with combined harvester.', status: 'Harvested' },
      { stage: 'collectionCenter', handlerName: 'Srinivas Hub Manager', handlerRole: 'collectionCenter', location: { name: 'Miryalaguda Collection Depot', lat: 16.8667, lng: 79.5667 }, timestamp: '2026-09-22T10:30:00Z', notes: 'Quality inspection passed. Grade A assigned.', status: 'Quality Checked' }
    ]
  },
  {
    batchId: 'FF-2026-000103',
    crop: { name: 'Mango', variety: 'Alphonso Premium', category: 'fruit', emoji: '🥭' },
    farmer: MOCK_FARMERS[5], // Srinivasulu Naidu
    harvestDate: '2026-09-25',
    quantity: 200,
    unit: 'quintal',
    qualityGrade: 'A',
    qualityNotes: 'Naturally ripened, Brix index 18.5, uniform size.',
    photoUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    currentLocation: { name: 'Highway Transit Express Truck AP-03-V-1122', lat: 15.8281, lng: 78.0373 },
    status: 'In Transit',
    pricePerUnit: 6500,
    organic: false,
    moisture: 82,
    expiryDate: '2026-10-25',
    carbonFootprint: { distanceKm: 310, co2SavedKg: 55 },
    costBreakdown: { farmerSharePercent: 58, logisticsPercent: 22, retailerMarginPercent: 20 },
    qrCode: 'FF-2026-000103',
    stageHistory: [
      { stage: 'farmer', handlerName: 'Srinivasulu Naidu', handlerRole: 'farmer', location: { name: 'Chittoor Orchards', lat: 13.2172, lng: 79.1003 }, timestamp: '2026-09-25T06:00:00Z', notes: 'Hand-picked during cool morning hours.', status: 'Harvested' },
      { stage: 'collectionCenter', handlerName: 'Chittoor Cold Chain', handlerRole: 'collectionCenter', location: { name: 'Chittoor Agri Hub', lat: 13.2172, lng: 79.1003 }, timestamp: '2026-09-26T14:00:00Z', notes: 'Hydro-cooling treatment completed.', status: 'Quality Checked', temperature: 13 },
      { stage: 'distributor', handlerName: 'Deccan Cargo Line', handlerRole: 'distributor', location: { name: 'Kurnool Highway Checkpoint', lat: 15.8281, lng: 78.0373 }, timestamp: '2026-10-04T18:30:00Z', notes: 'Dispatched to Bengaluru Wholesale Market.', status: 'In Transit', temperature: 14 }
    ]
  },
  {
    batchId: 'FF-2026-000104',
    crop: { name: 'Tomato', variety: 'Roma Red Hybrid', category: 'vegetable', emoji: '🍅' },
    farmer: MOCK_FARMERS[11], // Subramanian Swamy
    harvestDate: '2026-10-01',
    quantity: 800,
    unit: 'kg',
    qualityGrade: 'A',
    qualityNotes: 'Firm skin, deep scarlet color, no puncture defects.',
    photoUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    currentLocation: { name: 'More Supermarket Indiranagar', lat: 12.9784, lng: 77.6408 },
    status: 'Sold',
    pricePerUnit: 35,
    organic: true,
    moisture: 94,
    expiryDate: '2026-10-15',
    carbonFootprint: { distanceKm: 420, co2SavedKg: 60 },
    costBreakdown: { farmerSharePercent: 60, logisticsPercent: 20, retailerMarginPercent: 20 },
    ratings: [
      { id: 'r3', rating: 5, comment: 'Super fresh tomatoes! Kept well for a week.', userLocation: 'Bengaluru', date: '2026-10-05' }
    ],
    qrCode: 'FF-2026-000104',
    stageHistory: [
      { stage: 'farmer', handlerName: 'Subramanian Swamy', handlerRole: 'farmer', location: { name: 'Madurai East Fields', lat: 9.9252, lng: 78.1198 }, timestamp: '2026-10-01T05:30:00Z', notes: 'Harvested in crates.', status: 'Harvested' },
      { stage: 'collectionCenter', handlerName: 'Madurai Hub', handlerRole: 'collectionCenter', location: { name: 'Madurai Collection Hub', lat: 9.9252, lng: 78.1198 }, timestamp: '2026-10-01T12:00:00Z', notes: 'Graded and crated.', status: 'Quality Checked' },
      { stage: 'distributor', handlerName: 'Southern Freight', handlerRole: 'distributor', location: { name: 'Hosur Border Depot', lat: 12.7409, lng: 77.8253 }, timestamp: '2026-10-02T16:00:00Z', notes: 'In transit to Bengaluru.', status: 'In Transit' },
      { stage: 'retailer', handlerName: 'More Supermarket', handlerRole: 'retailer', location: { name: 'More Supermarket Indiranagar', lat: 12.9784, lng: 77.6408 }, timestamp: '2026-10-03T08:00:00Z', notes: 'Placed on organic vegetable rack.', status: 'At Retailer' },
      { stage: 'consumer', handlerName: 'Retail Counter Sale', handlerRole: 'consumer', location: { name: 'Consumer Basket Sale', lat: 12.9784, lng: 77.6408 }, timestamp: '2026-10-05T19:10:00Z', notes: 'Sold out to retail consumers.', status: 'Sold' }
    ]
  },
  {
    batchId: 'FF-2026-000105',
    crop: { name: 'Turmeric', variety: 'Salem Golden Finger', category: 'spice', emoji: '🟡' },
    farmer: MOCK_FARMERS[7], // Karthik Ramasamy
    harvestDate: '2026-09-15',
    quantity: 120,
    unit: 'quintal',
    qualityGrade: 'A',
    qualityNotes: 'High curcumin 5.2%, solar boiler processed & polished.',
    photoUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    currentLocation: { name: 'Salem Agri Processing Hub', lat: 11.6643, lng: 78.146 },
    status: 'Quality Checked',
    pricePerUnit: 14500,
    organic: true,
    moisture: 8.0,
    expiryDate: '2029-09-15',
    carbonFootprint: { distanceKm: 20, co2SavedKg: 10 },
    costBreakdown: { farmerSharePercent: 72, logisticsPercent: 10, retailerMarginPercent: 18 },
    qrCode: 'FF-2026-000105',
    stageHistory: [
      { stage: 'farmer', handlerName: 'Karthik Ramasamy', handlerRole: 'farmer', location: { name: 'Salem West Farm', lat: 11.6643, lng: 78.146 }, timestamp: '2026-09-15T09:00:00Z', notes: 'Boiled and sun-dried for 12 days.', status: 'Harvested' },
      { stage: 'collectionCenter', handlerName: 'Salem Spice Board Hub', handlerRole: 'collectionCenter', location: { name: 'Salem Agri Processing Hub', lat: 11.6643, lng: 78.146 }, timestamp: '2026-09-29T11:00:00Z', notes: 'Lab curcumin test passed (5.2%). Grade A.', status: 'Quality Checked' }
    ]
  },
  {
    batchId: 'FF-2026-000106',
    crop: { name: 'Banana', variety: 'Nendran Organic', category: 'fruit', emoji: '🍌' },
    farmer: MOCK_FARMERS[8], // Sujatha Menon
    harvestDate: '2026-09-29',
    quantity: 1200,
    unit: 'kg',
    qualityGrade: 'B',
    qualityNotes: 'Standard size suitable for chip processing and fresh table consumption.',
    photoUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
    currentLocation: { name: 'Palakkad Collection Warehouse', lat: 10.7867, lng: 76.6547 },
    status: 'At Collection Center',
    pricePerUnit: 42,
    organic: true,
    moisture: 78,
    expiryDate: '2026-10-20',
    carbonFootprint: { distanceKm: 15, co2SavedKg: 8 },
    costBreakdown: { farmerSharePercent: 65, logisticsPercent: 15, retailerMarginPercent: 20 },
    qrCode: 'FF-2026-000106',
    stageHistory: [
      { stage: 'farmer', handlerName: 'Sujatha Menon', handlerRole: 'farmer', location: { name: 'Palakkad Farm', lat: 10.7867, lng: 76.6547 }, timestamp: '2026-09-29T07:00:00Z', notes: 'Harvested mature green bunches.', status: 'Harvested' },
      { stage: 'collectionCenter', handlerName: 'Kerala Agri Hub', handlerRole: 'collectionCenter', location: { name: 'Palakkad Warehouse', lat: 10.7867, lng: 76.6547 }, timestamp: '2026-09-30T10:00:00Z', notes: 'De-handed & washed in clean water tank.', status: 'At Collection Center' }
    ]
  },
  {
    batchId: 'FF-2026-000107',
    crop: { name: 'Groundnut', variety: 'Kadiri-6 Bold', category: 'oilseed', emoji: '🥜' },
    farmer: MOCK_FARMERS[10], // Chandra Shekar
    harvestDate: '2026-09-18',
    quantity: 45,
    unit: 'quintal',
    qualityGrade: 'A',
    qualityNotes: 'Oil content 49%, double-pod yield, zero aflatoxin.',
    photoUrl: 'https://images.unsplash.com/photo-1567892320421-1c657571ea48?auto=format&fit=crop&w=600&q=80',
    currentLocation: { name: 'Anantapur Mandi Storage', lat: 14.6819, lng: 77.6006 },
    status: 'At Distributor',
    pricePerUnit: 6850,
    organic: false,
    moisture: 7.5,
    expiryDate: '2027-09-18',
    carbonFootprint: { distanceKm: 180, co2SavedKg: 35 },
    costBreakdown: { farmerSharePercent: 68, logisticsPercent: 14, retailerMarginPercent: 18 },
    qrCode: 'FF-2026-000107',
    stageHistory: [
      { stage: 'farmer', handlerName: 'Chandra Shekar', handlerRole: 'farmer', location: { name: 'Anantapur Fields', lat: 14.6819, lng: 77.6006 }, timestamp: '2026-09-18T08:00:00Z', notes: 'Threshed & pod-cleaned.', status: 'Harvested' },
      { stage: 'collectionCenter', handlerName: 'Anantapur APMC Hub', handlerRole: 'collectionCenter', location: { name: 'Anantapur Mandi', lat: 14.6819, lng: 77.6006 }, timestamp: '2026-09-20T11:00:00Z', notes: 'Verified Grade A.', status: 'Quality Checked' },
      { stage: 'distributor', handlerName: 'Rayalaseema Logistics', handlerRole: 'distributor', location: { name: 'Anantapur Storage Depot', lat: 14.6819, lng: 77.6006 }, timestamp: '2026-09-24T15:00:00Z', notes: 'Stored awaiting oil mill dispatch.', status: 'At Distributor' }
    ]
  },
  {
    batchId: 'FF-2026-000108',
    crop: { name: 'Cotton', variety: 'Bt Cotton Long Staple', category: 'cash crop', emoji: '☁️' },
    farmer: MOCK_FARMERS[6], // Laxmi Narayana
    harvestDate: '2026-09-22',
    quantity: 80,
    unit: 'quintal',
    qualityGrade: 'A',
    qualityNotes: 'Staple length 30mm, high micronaire 4.2, clean white bolls.',
    photoUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80',
    currentLocation: { name: 'Warangal Cotton Ginning Mill', lat: 17.9689, lng: 79.5941 },
    status: 'In Transit',
    pricePerUnit: 7400,
    organic: false,
    moisture: 8.1,
    expiryDate: '2028-09-22',
    carbonFootprint: { distanceKm: 90, co2SavedKg: 22 },
    costBreakdown: { farmerSharePercent: 74, logisticsPercent: 11, retailerMarginPercent: 15 },
    qrCode: 'FF-2026-000108',
    stageHistory: [
      { stage: 'farmer', handlerName: 'Laxmi Narayana', handlerRole: 'farmer', location: { name: 'Warangal Farm', lat: 17.9689, lng: 79.5941 }, timestamp: '2026-09-22T07:00:00Z', notes: 'Hand-picked first flush bolls.', status: 'Harvested' },
      { stage: 'distributor', handlerName: 'Telangana Agri Freight', handlerRole: 'distributor', location: { name: 'Warangal Highway', lat: 17.9689, lng: 79.5941 }, timestamp: '2026-09-26T10:00:00Z', notes: 'En route to Coimbatore Textile Mills.', status: 'In Transit' }
    ]
  },
  {
    batchId: 'FF-2026-000109',
    crop: { name: 'Coconut', variety: 'Tender Green Coconut', category: 'fruit', emoji: '🥥' },
    farmer: MOCK_FARMERS[2], // Murugan Selvam
    harvestDate: '2026-10-02',
    quantity: 3000,
    unit: 'kg',
    qualityGrade: 'A',
    qualityNotes: 'Average water volume 450ml per nut, high natural electrolytes.',
    photoUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80',
    currentLocation: { name: 'Pollachi Express Distribution Hub', lat: 10.6609, lng: 77.0048 },
    status: 'Harvested',
    pricePerUnit: 32,
    organic: true,
    moisture: 90,
    expiryDate: '2026-11-02',
    carbonFootprint: { distanceKm: 10, co2SavedKg: 5 },
    costBreakdown: { farmerSharePercent: 68, logisticsPercent: 12, retailerMarginPercent: 20 },
    qrCode: 'FF-2026-000109',
    stageHistory: [
      { stage: 'farmer', handlerName: 'Murugan Selvam', handlerRole: 'farmer', location: { name: 'Pollachi Coconut Estate', lat: 10.6609, lng: 77.0048 }, timestamp: '2026-10-02T06:30:00Z', notes: 'Climber harvested fresh green nuts.', status: 'Harvested' }
    ]
  },
  {
    batchId: 'FF-2026-000110',
    crop: { name: 'Maize', variety: 'Yellow Dent Corn', category: 'grain', emoji: '🌽' },
    farmer: MOCK_FARMERS[4], // Basavaraj Gowda
    harvestDate: '2026-09-10',
    quantity: 150,
    unit: 'quintal',
    qualityGrade: 'C',
    qualityNotes: 'Slight moisture elevation due to unexpected rain (14.2%). Moisture reduction required.',
    photoUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    currentLocation: { name: 'Davanagere APMC Yard', lat: 14.4673, lng: 75.9242 },
    status: 'Rejected',
    pricePerUnit: 1950,
    organic: false,
    moisture: 14.2,
    expiryDate: '2027-03-10',
    carbonFootprint: { distanceKm: 30, co2SavedKg: 8 },
    costBreakdown: { farmerSharePercent: 70, logisticsPercent: 15, retailerMarginPercent: 15 },
    qrCode: 'FF-2026-000110',
    stageHistory: [
      { stage: 'farmer', handlerName: 'Basavaraj Gowda', handlerRole: 'farmer', location: { name: 'Davanagere Farm', lat: 14.4673, lng: 75.9242 }, timestamp: '2026-09-10T08:00:00Z', notes: 'Harvested after rainy weekend.', status: 'Harvested' },
      { stage: 'collectionCenter', handlerName: 'Davanagere Hub Inspector', handlerRole: 'collectionCenter', location: { name: 'Davanagere Yard', lat: 14.4673, lng: 75.9242 }, timestamp: '2026-09-12T11:00:00Z', notes: 'Rejected: Moisture exceeds maximum 12% safety threshold. Returned for re-drying.', status: 'Rejected' }
    ]
  }
];

// Helper to generate remaining batches to reach 40+ total realistic batches
const generateMoreBatches = (): Batch[] => {
  const additionalCrops = [
    { name: 'Onion', variety: 'Nasik Red', category: 'vegetable' as const, emoji: '🧅', price: 24, unit: 'kg' as const },
    { name: 'Black Gram', variety: 'T-9 Urad', category: 'pulse' as const, emoji: '⚫', price: 82, unit: 'kg' as const },
    { name: 'Red Gram', variety: 'TGT-1 Tur', category: 'pulse' as const, emoji: '🔴', price: 95, unit: 'kg' as const },
    { name: 'Sugarcane', variety: 'Co 0238 Hybrid', category: 'cash crop' as const, emoji: '🎋', price: 340, unit: 'quintal' as const },
    { name: 'Paddy', variety: 'BPT 5204 Samba', category: 'grain' as const, emoji: '🌾', price: 232, unit: 'quintal' as const },
    { name: 'Chilli', variety: 'Byadagi Special', category: 'spice' as const, emoji: '🌶️', price: 210, unit: 'kg' as const },
    { name: 'Tomato', variety: 'Heirloom Organic', category: 'vegetable' as const, emoji: '🍅', price: 42, unit: 'kg' as const },
    { name: 'Mango', variety: 'Banganapalli', category: 'fruit' as const, emoji: '🥭', price: 5500, unit: 'quintal' as const },
    { name: 'Banana', variety: 'Grand Naine', category: 'fruit' as const, emoji: '🍌', price: 28, unit: 'kg' as const },
    { name: 'Coconut', variety: 'West Coast Tall', category: 'fruit' as const, emoji: '🥥', price: 36, unit: 'kg' as const }
  ];

  const statuses: Batch['status'][] = [
    'Created', 'Harvested', 'Quality Checked', 'At Collection Center',
    'In Transit', 'At Distributor', 'At Retailer', 'Sold', 'Expired'
  ];

  const extraBatches: Batch[] = [];

  for (let i = 11; i <= 44; i++) {
    const crop = additionalCrops[i % additionalCrops.length];
    const farmer = MOCK_FARMERS[i % MOCK_FARMERS.length];
    const status = statuses[i % statuses.length];
    const grade = (['A', 'A', 'B', 'A', 'C'][i % 5]) as 'A' | 'B' | 'C';
    const batchId = `FF-2026-000${i < 100 ? (i < 10 ? '0' + i : i) : i}`;
    
    extraBatches.push({
      batchId,
      crop,
      farmer,
      harvestDate: `2026-09-${10 + (i % 20)}`,
      quantity: (i * 45) % 1200 + 100,
      unit: crop.unit,
      qualityGrade: grade,
      qualityNotes: `Standard verified batch #${i}. Grade ${grade} evaluation parameters satisfied.`,
      photoUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
      currentLocation: {
        name: `${farmer.district} Central Logistics Node`,
        lat: 16.0 + (i % 3) * 0.5,
        lng: 78.0 + (i % 4) * 0.5
      },
      status,
      pricePerUnit: crop.price,
      organic: i % 2 === 0,
      moisture: 9.5 + (i % 4),
      expiryDate: `2027-09-${10 + (i % 20)}`,
      carbonFootprint: { distanceKm: i * 12 + 40, co2SavedKg: i * 3 + 10 },
      costBreakdown: { farmerSharePercent: 62, logisticsPercent: 18, retailerMarginPercent: 20 },
      qrCode: batchId,
      stageHistory: [
        {
          stage: 'farmer',
          handlerName: farmer.name,
          handlerRole: 'farmer',
          location: { name: `${farmer.village}, ${farmer.district}`, lat: 16.3, lng: 80.4 },
          timestamp: `2026-09-${10 + (i % 20)}T08:00:00Z`,
          notes: 'Harvest completed with quality checks.',
          status: 'Harvested'
        },
        ...(status !== 'Harvested' && status !== 'Created' ? [{
          stage: 'collectionCenter' as const,
          handlerName: `${farmer.district} Agri Hub Manager`,
          handlerRole: 'collectionCenter' as const,
          location: { name: `${farmer.district} Main Hub`, lat: 16.4, lng: 80.5 },
          timestamp: `2026-09-${12 + (i % 20)}T11:00:00Z`,
          notes: `Inspection complete. Assigned Grade ${grade}.`,
          status: 'Quality Checked' as const
        }] : [])
      ]
    });
  }

  return extraBatches;
};

export const MOCK_ALL_BATCHES: Batch[] = [
  ...MOCK_BATCHES,
  ...generateMoreBatches()
];
