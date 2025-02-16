function logRequest(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
}

function messageFormatter(req, res, next) {
  res.formatMessage = (message, data = null) => {
    return {
      message,
      data,
      timestamp: new Date().toISOString()
    };
  };
  next();
}

module.exports = {
  logRequest,
  errorHandler,
  messageFormatter
};