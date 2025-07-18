const { v4: uuidv4 } = require('uuid');

function logger(req, res, next) {
  const start = Date.now();
  const traceId = uuidv4();
  req.traceId = traceId;
  res.setHeader('X-Trace-ID', traceId);

  res.on('finish', () => {
    const time = Date.now() - start;
    console.log(`[${traceId}] ${req.method} ${req.url} - ${time}ms`);
  });

  next();
}

module.exports = logger;
