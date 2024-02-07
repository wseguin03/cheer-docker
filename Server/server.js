const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const app = express();

const port = 3001; // Use a different port from your React app

// Database Connection
mongoose.connect('mongodb://localhost/userDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

app.use(express.json()); // for parsing application/json

// Nodemailer Transporter
let transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail'
  auth: {
    user: 'cheer.noreply@gmail.com',
    pass: 'htzd nxpi zulw eabv'
  }
});

// Function to send verification email
const sendVerificationEmail = (userEmail, userId) => {
  const mailOptions = {
    from: 'cheer.noreply@gmail.com',
    to: userEmail,
    subject: 'Verify Your Email',
    text: `Please click on this link to verify your email: http://localhost:${port}/verify/${userId}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Verification email sent: ' + info.response);
    }
  });
};

// Registration Endpoint
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    const user = await newUser.save();
    
    // Send verification email
    sendVerificationEmail(user.email, user._id);
    
    res.status(201).send('User registered successfully. Please check your email to verify your account.');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error registering user');
  }
});

// Verification Endpoint
app.get('/verify/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user && !user.isVerified) {
      user.isVerified = true;
      await user.save();
      res.send('Email verified successfully. You can now login.');
    } else {
      res.status(404).send('User not found or already verified');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error verifying email');
  }
});

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
