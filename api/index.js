const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// Middleware for parsing JSON and serving static files
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve the index.html page when visiting the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Assets
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;