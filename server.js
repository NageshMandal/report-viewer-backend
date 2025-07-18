const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const reportsRoutes = require('./routes/reports');
const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(logger);

// Mount routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/reports', reportsRoutes);
app.use('/feedback', feedbackRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
