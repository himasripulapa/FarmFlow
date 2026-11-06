/**
 * LAB 3B: User Authentication (Register, Login, Session Management, Logout) with bcryptjs
 * Syllabus Demo - Runnable standalone with: node syllabus-demo/lab3b-authentication.js
 */

const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3007;

app.use(express.json());
app.use(
  session({
    secret: 'lab3b-auth-secret-key-5678',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
  })
);

// In-memory user database
const users = [];

// 1. REGISTER
app.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const existing = users.find(u => u.email === email.toLowerCase());
    if (existing) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password with salt rounds = 10
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      email: email.toLowerCase(),
      passwordHash,
      role: role || 'farmer'
    };

    users.push(newUser);

    // Auto-login upon registration
    req.session.userId = newUser.id;
    req.session.role = newUser.role;

    res.status(201).json({
      message: 'User registered & session established',
      user: { id: newUser.id, email: newUser.email, role: newUser.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. LOGIN
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === (email || '').toLowerCase());

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare plain-text password with bcrypt hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Store in session
    req.session.userId = user.id;
    req.session.role = user.role;

    res.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. PROTECTED ROUTE (Requires active session)
app.get('/dashboard', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized: Please log in first' });
  }

  const user = users.find(u => u.id === req.session.userId);
  res.json({
    message: `Welcome to FarmFlow Dashboard, ${user.email}!`,
    sessionRole: req.session.role
  });
});

// 4. LOGOUT
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully, session destroyed' });
  });
});

app.listen(PORT, () => {
  console.log(`[Lab 3B] Server running at http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log(`  POST http://localhost:${PORT}/register (body: {"email":"farmer@example.com","password":"secretpassword"})`);
  console.log(`  POST http://localhost:${PORT}/login    (body: {"email":"farmer@example.com","password":"secretpassword"})`);
  console.log(`  GET  http://localhost:${PORT}/dashboard`);
  console.log(`  POST http://localhost:${PORT}/logout`);
});
