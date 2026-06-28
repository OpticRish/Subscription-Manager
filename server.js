const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Serve static frontend files
app.use(express.static(__dirname));

// Auth hook endpoint
// Auth hook endpoint (loads and uses the same handler deployed to Vercel)
const authHookHandler = require('./api/auth-hook');
app.post('/api/auth-hook', authHookHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Unified server running at http://0.0.0.0:${PORT}`);
});
