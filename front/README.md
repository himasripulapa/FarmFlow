# FarmFlow 🌾

> **Tagline**: "From Farm to Fork, Tracked."  
> *(తెలుగు: "చేను నుండి పళ్లెం వరకు, పారదర్శక ట్రాకింగ్." | हिन्दी: "खेत से थाली तक, हर कदम पर नज़र।" | தமிழ்: "பண்ணையிலிருந்து தட்டு வரை, துல்லிய கண்காணிப்பு." | മലയാളം: "പാടത്തുനിന്ന് പ്ലേറ്റിലേക്ക്, സുതാര്യമായ ട്രാക്കിംഗ്.")*

FarmFlow is a full-featured, mobile-first agricultural supply chain tracking system built with **React 18, Vite, TypeScript, Tailwind CSS v4, Zustand, react-i18next, Recharts, Leaflet, and QR code generation/scanning**.

---

## 🚀 Quick Setup & Running Locally

```bash
# 1. Clone or navigate to directory
cd FarmFlow

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

The application runs locally at `http://localhost:5173`.

---

## 🎨 Branding & Visual Identity
- **App Name**: FarmFlow
- **Logo**: Reusable `<Logo />` SVG mark combining an agricultural leaf (`#2E7D32`) and a flowing path (`#F9A825`).
- **Favicon & Manifest**: SVG Favicon and PWA `manifest.json` included in `/public`.
- **Batch ID Format**: `FF-2026-000123` (prefix `FF`).
- **Color Palette**: Primary Green `#2E7D32`, Golden Yellow `#F9A825`, Earthy Brown `#6D4C41`, Light Cream Background `#FAFAF5`.

---

## 🌐 Multi-Language Architecture (5 Languages)

FarmFlow supports 5 languages dynamically mapped to native Google Fonts so no glyph breaks:

| Code | Language | Native Name | Primary Font Family |
| text | text | text | text |
| `en` | English | English | `Inter` |
| `te` | Telugu | తెలుగు | `Noto Sans Telugu` |
| `hi` | Hindi | हिन्दी | `Noto Sans Devanagari` |
| `ta` | Tamil | தமிழ் | `Noto Sans Tamil` |
| `ml` | Malayalam | മലയാളം | `Noto Sans Malayalam` |

### How to Add a New Language (e.g., Kannada `kn`):
1. Create `/src/locales/kn.json` with translated keys matching `en.json`.
2. Open `/src/locales/i18n.ts`:
   - Import `kn` JSON file.
   - Add font mapping: `kn: "'Noto Sans Kannada', sans-serif"`.
   - Register `kn` in `i18n.init({ resources: { ... }, supportedLngs: ['en', 'te', 'hi', 'ta', 'ml', 'kn'] })`.
3. Add native option in `/src/components/ui/LanguagePickerModal.tsx`.

---

## 👥 Roles & Demo Accounts

Try instant demo logins from the login screen or top navbar role switcher:

| Role | Demo User | Description |
| text | text | text |
| **Farmer** | Swathi | Harvest entry, QR label printing, mandi rates & weather |
| **Collection Center** | Anand Kumar | Lab moisture inspection, quality grading (A/B/C), storage bay assignment |
| **Distributor** | Vikram Freight | Logistics truck fleet, driver dispatch, transit tracking |
| **Retailer** | Priya Sharma (GreenBazar) | Shelf inventory, near-expiry alerts, mark as sold |
| **Public Consumer** | Guest (No Login Needed) | Scan QR or enter Batch ID to trace farm-to-fork origin |
| **Admin** | Dr. S. K. Roy | User management, system analytics & CSV report export |

---

## 🛠️ Folder Structure

```
FarmFlow/
├── public/
│   ├── favicon.svg             # SVG logo icon
│   └── manifest.json           # PWA web app manifest
├── src/
│   ├── components/
│   │   ├── batch/              # BatchCard, BatchTable, BatchStepperTimeline, BatchPrintLabel, ComplaintModal
│   │   ├── branding/           # Logo, BrandHeader
│   │   ├── charts/             # StageFunnelChart, QuantityTrendChart, CropDonutChart, PriceBreakdownChart
│   │   ├── layout/             # Navbar, Sidebar, MobileNav, Footer
│   │   ├── maps/               # JourneyMap (Leaflet + OpenStreetMap)
│   │   ├── ui/                 # VoiceInputButton, SpeechSynthButton, OfflineBanner, LanguagePickerModal, QRScannerModal
│   │   └── widgets/            # MandiPricesWidget, WeatherWidget, WhatsAppHelpWidget
│   ├── hooks/                  # useSpeechRecognition, useSpeechSynthesis, useGeolocation
│   ├── locales/                # en.json, te.json, hi.json, ta.json, ml.json, i18n.ts
│   ├── mock/                   # Seed data: 40+ batches, 15 farmers, 20 buyers, 100+ transactions
│   ├── pages/
│   │   ├── admin/              # UserManagementPage, AnalyticsReportsPage
│   │   ├── auth/               # LoginPage, RegisterPage
│   │   ├── center/             # CenterDashboard, IncomingBatchesPage
│   │   ├── distributor/        # ShipmentsPage
│   │   ├── farmer/             # FarmerDashboard, CreateBatchPage, MyBatchesPage, FarmerEarningsPage
│   │   ├── public/             # LandingPage, ConsumerTracePage, HelpCenterPage, NotFoundPage
│   │   ├── retailer/           # RetailInventoryPage
│   │   └── shared/             # GlobalSearchPage, TransactionsPage, BuyerManagementPage, ProfilePage
│   ├── routes/                 # AppRoutes, ProtectedRoute
│   ├── services/               # api.ts (mock async API layer returning promises)
│   ├── store/                  # useAuthStore, useBatchStore, useSettingsStore, useNotificationStore, useOfflineStore
│   ├── types/                  # index.ts (TypeScript interfaces for Batch, User, Buyer, Transaction, etc.)
│   └── utils/                  # formatters.ts, pdfGenerator.ts, carbonCalculator.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🔌 Backend Integration Points (API Endpoint Specification)

When connecting a real backend (Node.js/Express, Python/FastAPI, Spring Boot, etc.), replace `/src/services/api.ts` mock functions with your base HTTP client (e.g. `axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL })`).

The frontend expects the following endpoints:

### 1. Batches & Traceability
| Method | Endpoint | Description | Request Body / Query | Response |
| text | text | text | text | text |
| `GET` | `/api/v1/batches` | Fetch all batches with optional filters | `?status=Harvested&crop=Chilli&search=FF-2026` | `Batch[]` |
| `GET` | `/api/v1/batches/:batchId` | Fetch single batch by ID | Path param `:batchId` | `Batch` |
| `POST` | `/api/v1/batches` | Create a new harvest batch | `{ crop, farmer, harvestDate, quantity, unit, qualityGrade, pricePerUnit, organic, moisture }` | `Batch` (returns generated `batchId` & QR URL) |
| `PUT` | `/api/v1/batches/:batchId/status` | Update batch status & add stage history | `{ status: "At Collection Center", stage: "collectionCenter", handlerName, location: { name, lat, lng }, notes }` | `Batch` |
| `POST` | `/api/v1/batches/:batchId/ratings` | Submit consumer rating/feedback | `{ rating: 5, comment: "Fresh organic chilli!", userLocation: "Hyderabad" }` | `Batch` |

### 2. Transactions & Ledger
| Method | Endpoint | Description | Request Body / Query | Response |
| text | text | text | text | text |
| `GET` | `/api/v1/transactions` | Fetch all transactions | `?status=Paid` | `Transaction[]` |
| `POST` | `/api/v1/transactions` | Record a new payment transaction | `{ batchId, fromUser, toUser, totalAmount, paymentMethod }` | `Transaction` |

### 3. Buyers & Offtakers
| Method | Endpoint | Description | Request Body / Query | Response |
| text | text | text | text | text |
| `GET` | `/api/v1/buyers` | Fetch registered buyers list | None | `Buyer[]` |
| `POST` | `/api/v1/buyers` | Register new buyer organization | `{ name, type, phone, email, city, state }` | `Buyer` |

### 4. Live Market Rates & Weather
| Method | Endpoint | Description | Request Body / Query | Response |
| text | text | text | text | text |
| `GET` | `/api/v1/mandi-prices` | Fetch live Mandi rates | `?state=Andhra Pradesh` | `MandiPrice[]` |
| `GET` | `/api/v1/weather` | Fetch local farm weather & advisory | `?lat=16.3067&lng=80.4365` | `WeatherInfo` |

### 5. Authentication & User Management
| Method | Endpoint | Description | Request Body / Query | Response |
| text | text | text | text | text |
| `POST` | `/api/v1/auth/send-otp` | Request mobile login OTP | `{ phone: "9848012345" }` | `{ success: true, message: "OTP sent" }` |
| `POST` | `/api/v1/auth/verify-otp` | Verify OTP code | `{ phone: "9848012345", otp: "123456" }` | `{ token: "jwt_token...", user: User }` |
| `GET` | `/api/v1/users` | List all system users (Admin) | None | `User[]` |
| `PATCH` | `/api/v1/users/:userId/role` | Update user role/status (Admin) | `{ role: "collectionCenter" }` | `User` |

---

## 🏆 Key Features Implemented

1. **QR Code Scanning & Generation**: Full QR scanning with camera or image upload via `html5-qrcode` + printable sticker labels with `qrcode.react`.
2. **Interactive Journey Map**: Real-time Leaflet + OpenStreetMap rendering batch progression across GPS coordinates.
3. **Fair-Price Transparency Breakdown**: Recharts pie visualization showing Farmer's share vs. Logistics vs. Retailer margin.
4. **Digital Batch Certificate / Passport**: Downloadable PDF passport with QR code, lab test notes, and full chain-of-custody using `jspdf`.
5. **Low-Literacy & Voice Input Support**: Speech recognition in 5 languages (English, Telugu, Hindi, Tamil, Malayalam) and Text-to-speech read aloud summaries.
6. **Multi-Language Font Switching**: Automatically applies `Noto Sans Telugu`, `Noto Sans Devanagari`, `Noto Sans Tamil`, or `Noto Sans Malayalam` to standardise typography.
7. **Offline Mode Simulation**: Banner and queued action store when network drops.
