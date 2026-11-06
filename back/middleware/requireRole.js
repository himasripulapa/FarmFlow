const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: 'Please log in' });
    }
    const userRole = req.session.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: `Forbidden: role '${userRole}' is not authorized to access this resource`
      });
    }
    next();
  };
};

module.exports = requireRole;
