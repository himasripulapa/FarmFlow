require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const expressLayouts = require('express-ejs-layouts');

const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

// Route files
const authRoutes = require('./routes/auth');
const batchRoutes = require('./routes/batches');
const transactionRoutes = require('./routes/transactions');
const buyerRoutes = require('./routes/buyers');
const userRoutes = require('./routes/users');
const marketRoutes = require('./routes/market');
const viewRoutes = require('./routes/views');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// 1. Connect to MongoDB Atlas
connectDB();

// 2. View Engine (EJS + express-ejs-layouts)
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

// 3. Middlewares in exact specified order:
// cors > logger > express.json() > express.urlencoded() > cookie-parser > express-session

// CORS
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  })
);

// Logger
app.use(logger);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// Express Session with MongoDB Atlas Store
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'farmflow_session_fallback_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: 'sessions',
      ttl: 7 * 24 * 60 * 60 // 7 days in seconds
    }),
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
      secure: process.env.NODE_ENV === 'production'
    }
  })
);

// 4. API & View Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to FarmFlow Agricultural Supply Chain API',
    status: 'online',
    version: '1.0.0'
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/batches', batchRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/buyers', buyerRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1', marketRoutes);
app.use('/views', viewRoutes);

// 5. 404 Handler
app.use(notFound);

// 6. Central Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`FarmFlow Server running on port ${PORT}`);
  console.log(`Allowing CORS origin: ${CLIENT_ORIGIN}`);
});

module.exports = app;
