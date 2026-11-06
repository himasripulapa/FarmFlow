const bcrypt = require('bcryptjs');
const User = require('../models/User');

// POST /api/v1/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, phone, email, password, role, city, village, district, state, adminCode } = req.body;

    if (!name || !phone || !email || !password) {
      return res.status(400).json({ message: 'Name, phone, email, and password are required' });
    }

    const assignedRole = role || 'farmer';

    // Verify admin code if registering as admin
    if (assignedRole === 'admin') {
      const serverAdminCode = process.env.ADMIN_SECRET_CODE;
      if (!adminCode || adminCode !== serverAdminCode) {
        return res.status(403).json({
          message: 'Invalid Admin Secret Code. You cannot register as admin without authorization.'
        });
      }
    }

    // Check duplicate email or phone
    const normalizedEmail = email.toLowerCase().trim();
    const existingEmail = await User.findOne({ email: normalizedEmail });
    if (existingEmail) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }

    const existingPhone = await User.findOne({ phone: phone.trim() });
    if (existingPhone) {
      return res.status(409).json({ message: 'An account with this phone number already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name: name.trim(),
      phone: phone.trim(),
      email: normalizedEmail,
      passwordHash,
      role: assignedRole,
      city: city ? city.trim() : (village ? village.trim() : ''),
      village: village ? village.trim() : '',
      district: district ? district.trim() : '',
      state: state ? state.trim() : 'Andhra Pradesh'
    });

    // Establish session
    req.session.userId = user._id.toString();
    req.session.role = user.role;

    // Send back serialized user
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!user.active) {
      return res.status(403).json({ message: 'Account is deactivated. Please contact administrator.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Establish session
    req.session.userId = user._id.toString();
    req.session.role = user.role;

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/auth/logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out, please try again' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
};

// GET /api/v1/auth/me
exports.getMe = async (req, res, next) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ message: 'User session no longer valid' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};
