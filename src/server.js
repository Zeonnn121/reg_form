const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');






admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com` // Add this line
});

const db = admin.firestore();
db.settings({ 
  ignoreUndefinedProperties: true // Prevents undefined fields from causing errors
});
db.collection('test').doc('connection').set({ test: true })
  .then(() => console.log('Firestore connection successful'))
  .catch(err => console.error('Firestore connection failed:', err));
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing form data
// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://reg-form-flax.vercel.app',
    'https://reg-form-1xw5idwgr-zeons-projects-e0ee34d7.vercel.app/'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  }
});

// Verify email transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter error:', error);
  } else {
    console.log('✅ Mail transporter is ready');
  }
});

// Function to send confirmation email
const sendConfirmationEmail = async (registration) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
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
            <li><strong>Roll No:</strong> ${registration.rollNo || 'N/A'}</li>
            <li><strong>Year:</strong> ${registration.year || 'N/A'}</li>
            <li><strong>Branch:</strong> ${registration.branch || 'N/A'}</li>
          </ul>
          <p style="margin-top: 20px;">
            Join our <a href="https://chat.whatsapp.com/your-invite-link" target="_blank" style="color: #059669;">WhatsApp community</a> for updates.
          </p>
          <p>Please bring your college ID card on the event day.</p>
          <p>If you have any questions, just reply to this email.</p>
          <p style="margin-top: 30px;">Best regards,<br>Beach Cleanup Organizing Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Confirmation email sent to:', registration.email);
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error);
  }
};

// Health Check Route
app.get('/', (req, res) => {
  res.send('🌊 Beach Cleanup 2025 Server is running!');
});

// Registration API Endpoint using Firebase Firestore
app.post('/api/register', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const registrationData = {
      ...req.body,
      registrationDate: admin.firestore.Timestamp.now()
    };

    const docRef = await db.collection('registrations').add(registrationData);
    console.log('✅ Registration saved with ID:', docRef.id);

    // Send confirmation email
    await sendConfirmationEmail(registrationData);

    res.status(201).json({
      message: 'Registration successful',
      id: docRef.id,
      data: registrationData
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({
      message: 'Registration failed',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
