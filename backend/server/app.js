const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || '*', // Restrict in production
}));
app.use(helmet()); // Security headers
app.use(express.json()); // To parse JSON bodies

// Routes
const apiRoutes = require('./routes/routes');
app.use('/api', apiRoutes);

// Basic Error Handler (optional, extend as needed)
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
