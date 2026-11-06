const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid format for field: ${err.path}`;
  }

  // Mongoose Duplicate Key Error (code 11000)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate value entered for ${field}. Please use another value.`;
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  const isProduction = process.env.NODE_ENV === 'production';

  if (req.originalUrl && req.originalUrl.startsWith('/api')) {
    return res.status(statusCode).json({
      message,
      ...(isProduction ? {} : { stack: err.stack })
    });
  }

  res.status(statusCode).render('404', {
    title: 'Error',
    path: req.originalUrl || '',
    message
  });
};

module.exports = errorHandler;
