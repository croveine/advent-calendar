import nodemailer from 'nodemailer';

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: 'tov2025tov@gmail.com', // Your email
    pass: 'rkbs mnkm yoru iipx' // Your email password or app password
  }
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { name, phone, product } = req.body;

    // Trim whitespace from inputs
    name = name ? name.trim() : '';
    phone = phone ? phone.trim() : '';
    product = product ? product.trim() : ''; // Trim product name

    // Check for all required fields
    if (!name || !phone || !product) {
      console.log('Missing required fields'); // Log the missing fields
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Phone number validation: allow digits and an optional leading '+'
    const phoneRegex = /^\+?\d+$/; // Matches optional '+' followed by one or more digits
    if (!phoneRegex.test(phone)) {
      console.log('Invalid phone number format:', phone); // Log invalid phone number
      return res.status(400).json({ message: 'Invalid phone number format. Only digits and an optional leading "+" are allowed.' });
    }

    // Configure the email options
    const mailOptions = {
      from: 'tov2025tov@gmail.com',
      to: 'tov2025tov@gmail.com', // Your recipient email
      subject: 'Нове замовлення:',
      text: `Ім'я замовника: ${name}\nНомер телефону: ${phone}\nПродукт: ${product}` // Include product in the email
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error); // Log the error
        return res.status(500).json({ message: 'Error sending email: ' + error.message });
      }
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ message: 'Order placed successfully' });
    });
  } else {
    // Handle non-POST requests
    res.status(405).json({ message: 'Method not allowed' });
  }
}