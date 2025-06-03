const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const express = require('express');
require('dotenv').config(); 
const app = express();


// Middleware
app.use(cors());
app.use(express.json());
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beachCleanupDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Error with mail transporter:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});
// Start server
const PORT = process.env.PORT || 5000;

// Define Registration Schema
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: { type: String },
  rollNo: String,
  emergencyContact: String,
  emergencyPhone: { type: String },
  year: String,
  branch: String,
  registrationDate: { type: Date, default: Date.now }
});
const Registration = mongoose.model('Registration', registrationSchema);

// Function to send confirmation email
const sendConfirmationEmail = async (registration) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME || 'your-email@gmail.com',
      to: registration.email,
      subject: 'Registration Confirmation - Beach Cleanup 2025',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">Thank you for registering!</h2>
          <p>Dear ${registration.name},</p>
          <p>Your registration for Beach Cleanup 2025 has been successfully received.</p>
          
          <h3 style="color: #059669; margin-top: 20px;">Event Details</h3>
          <ul>
            <li><strong>Date:</strong> July, 2025</li>
            <li><strong>Location:</strong> Girgaon Chowpatty</li>
            <li><strong>Time:</strong> 7:30 am to 9:30 am</li>
          </ul>
          
          <h3 style="color: #059669; margin-top: 20px;">Your Registration Details</h3>
          <ul>
            <li><strong>Name:</strong> ${registration.name}</li>
            <li><strong>Roll No:</strong> ${registration.rollNo}</li>
            <li><strong>Year:</strong> ${registration.year}</li>
            <li><strong>Branch:</strong> ${registration.branch}</li>
          </ul>
          <p style="margin-top: 20px;">
  Join our <a href="https://chat.whatsapp.com/your-invite-link" target="_blank" style="color: #059669; text-decoration: none;">WhatsApp community</a> to receive live updates and important announcements about the event.
</p>
          <p style="margin-top: 20px;">Please bring your college ID card on the event day.</p>
          <p>If you have any questions, please reply to this email.</p>
          
          <p style="margin-top: 30px;">Best regards,<br>Beach Cleanup Organizing Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to:', registration.email);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};
console.log('EMAIL_USERNAME:', process.env.EMAIL_USERNAME);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);

// API Endpoint to handle registration
app.post('/api/register', async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    await newRegistration.save();
    
    console.log('✅ Registration saved:', newRegistration);

    sendConfirmationEmail(newRegistration);
    
    res.status(201).json({ 
      message: 'Registration successful', 
      data: newRegistration 
    });
  } catch (error) {
    console.error('❌ Error saving registration:', error);
    res.status(400).json({ 
      message: 'Registration failed', 
      error: error.message 
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Start server
