# FarmFlow Backend (Node.js + Express + MongoDB Atlas)

A RESTful and server-rendered backend for the FarmFlow agricultural supply chain traceability system, built according to strict educational syllabus specifications.

---

## 🚀 Technologies Used
- **Runtime:** Node.js (v20+)
- **Framework:** Express.js (Routing, HTTP methods, Route params, Query params, Hand-crafted Middleware)
- **Database & ODM:** MongoDB Atlas + Mongoose
- **View Engine:** EJS + express-ejs-layouts
- **Session & Cookies:** express-session + connect-mongo + cookie-parser
- **Security:** bcryptjs (password hashing, 10 rounds)
- **CORS:** cors

---

## 📋 Beginner's Guide: Setting Up Free MongoDB Atlas

Follow these step-by-step instructions to get your free cloud database running:

### Step 1: Create a Free MongoDB Atlas Account
1. Visit [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and click **Try Free**.
2. Sign up with your email or Google account.

### Step 2: Deploy an M0 Free Cluster
1. On the Atlas dashboard, click **Create** or **Build a Database**.
2. Select the **M0 Free** (Shared) tier ($0 forever, 512 MB storage).
3. Choose your preferred Cloud Provider & Region (e.g., AWS / `ap-south-1` Mumbai).
4. Leave Cluster Name as `Cluster0` or name it `farmflow-cluster`. Click **Create Deployment**.

### Step 3: Create a Database User
1. When prompted under **Security Quickstart**, choose **Username and Password**.
2. Enter a username (e.g., `farmuser`).
3. Enter a secure password or generate one (remember this password; avoid special characters like `@` or `:` or URL-encode them).
4. Click **Create Database User**.

### Step 4: Configure Network Access (Allow Connections)
1. In the Security Quickstart (or from the left sidebar under **Security > Network Access**), click **Add IP Address**.
2. Select **Allow Access from Anywhere** (`0.0.0.0/0`) for development.
3. Click **Confirm**.

### Step 5: Get Your Connection String
1. Go to **Database Deployments** and click the **Connect** button next to your cluster.
2. Under **Connect to your application**, select **Drivers**.
3. Select Driver **Node.js** and version **5.5 or later**.
4. Copy the connection string. It will look like:
   ```text
   mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
   ```
5. Specify the database name `farmflow` right before the `?` query parameters:
   ```text
   mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/farmflow?retryWrites=true&w=majority
   ```

### Step 6: Configure `back/.env`
1. Open `back/.env`.
2. Replace `<username>` and `<password>` with the database credentials you created in Step 3:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://farmuser:yourpassword123@cluster0.abcde.mongodb.net/farmflow?retryWrites=true&w=majority
   SESSION_SECRET=a_very_long_secure_random_session_secret_key_farmflow
   CLIENT_ORIGIN=http://localhost:5173
   ADMIN_SECRET_CODE=ADMIN2026SECRET
   ```

### Step 7: Verify Collections in Atlas
1. Start the server with `npm run dev`. The console will display:
   ```text
   MongoDB connected: cluster0-shard-00-00.abcde.mongodb.net
   FarmFlow Server running on port 5000
   ```
2. Open the frontend at `http://localhost:5173/register` and register your first account.
3. In MongoDB Atlas, click **Database > Browse Collections**.
4. You will see database `farmflow` with collections:
   - `users` (contains your newly registered user document with a hashed password, never plain text)
   - `sessions` (stores express-session cookies managed by `connect-mongo`)

---

## 🏃 Running the Application

### 1. Install Dependencies
```bash
cd back
npm install
```

### 2. Seed Reference Mandi Prices (The ONLY allowed seed)
```bash
npm run seed:mandi
```
*Note: All users, batches, buyers, and transactions start completely empty and are created through the application interface.*

### 3. Start Development Server
```bash
npm run dev
```

---

## 🔌 API Endpoints Reference (/api/v1)

### Authentication (`/api/v1/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/register` | Register new account (name, phone, email, password, role, city, state, adminCode?) | Public |
| POST | `/login` | Authenticate with email & password | Public |
| POST | `/logout` | Destroy session & clear cookie | Authenticated |
| GET | `/me` | Get currently logged-in user from session | Authenticated |

### Batches (`/api/v1/batches`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/` | List batches (query: `status`, `crop`, `search`, `page`, `limit`) | Authenticated (role-filtered) |
| GET | `/:batchId` | Full journey of a batch by `batchId` | Public (QR trace) |
| POST | `/` | Create new batch (auto-generates `FF-YYYY-000XXX`) | Farmer only |
| PUT | `/:batchId/status` | Update custody stage & status | Hub, Dist, Retailer, Admin |
| POST | `/:batchId/ratings` | Submit consumer rating (1-5) & comment | Public |
| POST | `/:batchId/complaints` | File consumer quality complaint | Public |
| DELETE | `/:batchId` | Delete batch | Owner Farmer or Admin |

### Transactions & Buyers
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/v1/transactions` | List all transactions (`?status=`) | Authenticated |
| POST | `/api/v1/transactions` | Record new transaction | Authenticated |
| DELETE | `/api/v1/transactions/:id` | Remove transaction | Admin only |
| GET | `/api/v1/buyers` | List registered buyers | Authenticated |
| POST | `/api/v1/buyers` | Add new buyer profile | Authenticated |
| PUT | `/api/v1/buyers/:id` | Update buyer profile | Owner or Admin |
| DELETE | `/api/v1/buyers/:id` | Delete buyer profile | Owner or Admin |

### Users (Admin Only)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/v1/users` | List all registered users | Admin only |
| PATCH | `/api/v1/users/:userId/role` | Change user role | Admin only |
| PATCH | `/api/v1/users/:userId/active` | Activate / deactivate user | Admin only |
| DELETE | `/api/v1/users/:userId` | Delete user | Admin only |

### Market & Analytics
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/v1/mandi-prices` | Mandi market rates (`?state=&crop=`) | Public |
| GET | `/api/v1/weather` | Static weather advisory for coordinates | Public |
| GET | `/api/v1/analytics/summary` | Aggregated funnel, crop volume & monthly trend | Admin only |

---

## 🎨 Server-Rendered Views (`/views`)
- **Admin Report:** `GET /views/admin-report` (Executive table report with MongoDB aggregation pipeline metrics)
- **Printable Certificate:** `GET /views/certificate/:batchId` (Official authenticity certificate for QR code)
- **Public Complaint Form:** `GET /views/complaint/:batchId` & `POST /views/complaint/:batchId` (Form data urlencoded handling)
