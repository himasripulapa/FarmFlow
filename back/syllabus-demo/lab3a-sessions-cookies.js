/**
 * LAB 3A: State Management using Cookies and Express-Session
 * Syllabus Demo - Runnable standalone with: node syllabus-demo/lab3a-sessions-cookies.js
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const PORT = 3006;

app.use(cookieParser());
app.use(
  session({
    secret: 'lab3a-secret-encryption-key-1234',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour
      httpOnly: true
    }
  })
);

// 1. Session Visit Counter
app.get('/session-counter', (req, res) => {
  if (req.session.views) {
    req.session.views += 1;
  } else {
    req.session.views = 1;
  }

  res.json({
    message: 'Session counter tracked via server-side session memory',
    sessionId: req.sessionID,
    visitCount: req.session.views
  });
});

// 2. Set Cookie (res.cookie)
app.get('/set-cookie', (req, res) => {
  const language = req.query.lang || 'te';
  res.cookie('preferred_language', language, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true
  });

  res.json({
    message: `Cookie 'preferred_language' set to '${language}'`,
    cookieDetails: { key: 'preferred_language', value: language, httpOnly: true }
  });
});

// 3. Read Cookie (req.cookies)
app.get('/read-cookie', (req, res) => {
  const lang = req.cookies.preferred_language || 'not set (default en)';
  res.json({
    message: 'Inspected cookies from incoming HTTP request header',
    allCookies: req.cookies,
    preferredLanguage: lang
  });
});

// 4. Clear Cookie (res.clearCookie)
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('preferred_language');
  res.json({
    message: "Cookie 'preferred_language' has been cleared"
  });
});

app.listen(PORT, () => {
  console.log(`[Lab 3A] Server running at http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log(`  http://localhost:${PORT}/session-counter (refresh multiple times)`);
  console.log(`  http://localhost:${PORT}/set-cookie?lang=hi`);
  console.log(`  http://localhost:${PORT}/read-cookie`);
  console.log(`  http://localhost:${PORT}/clear-cookie`);
});
