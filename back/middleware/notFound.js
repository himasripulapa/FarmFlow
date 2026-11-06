const notFound = (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({
      message: `API endpoint not found: ${req.method} ${req.originalUrl}`
    });
  }
  res.status(404).render('404', {
    title: 'Page Not Found',
    path: req.originalUrl
  });
};

module.exports = notFound;
