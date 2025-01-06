const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// Middleware for parsing JSON and serving static files
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Serve the index.html page when visiting the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Assets
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: 'tov2025tov@gmail.com', // Your email
        pass: 'rkbs mnkm yoru iipx' // Your email password or app password
    }
});

// Route to handle order submission
app.post('/send-order', (req, res) => {
    console.log('Request body:', req.body);
    let { name, phone, product } = req.body;

    // Trim whitespace from inputs
    name = name ? name.trim() : '';
    phone = phone ? phone.trim() : '';
    product = product ? product.trim() : ''; // Trim product name

    if (!name || !phone || !product) { // Check for all required fields
        console.log('Missing required fields'); // Log the missing fields
        return res.status(400).send('Missing required fields');
    }

    // Phone number validation: allow digits and an optional leading '+'
    const phoneRegex = /^\+?\d+$/; // Matches optional '+' followed by one or more digits
    if (!phoneRegex.test(phone)) {
        console.log('Invalid phone number format:', phone); // Log invalid phone number
        return res.status(400).send('Invalid phone number format. Only digits and an optional leading "+" are allowed.');
    }

    const mailOptions = {
        from: 'tov2025tov@gmail.com',
        to: 'tov2025tov@gmail.com', // Your recipient email
        subject: 'Нове замовлення:',
        text: `Ім'я замовника: ${name}\nНомер телефону: ${phone}\nПродукт: ${product}` // Include product in the email
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error); // Log the error
            return res.status(500).send('Error sending email' + error.message);
        }
        console.log('Email sent: ' + info.response);
        res.status (200).send('Order placed successfully');
    });
});