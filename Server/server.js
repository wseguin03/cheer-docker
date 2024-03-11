const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 3001; // Use a different port from your React app
const userRoutes = require('./routes/userRoutes');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
// require('dotenv').config()
// console.log("TOKEN"+ process.env.JWT_SECRET)
// Connect to MongoDB
mongoose.connect('mongodb+srv://temp_user:admin@cheer.gzid9bc.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', function () {
  console.log("MongoDB database connection established successfully");
});// User Schema
// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phoneNumber: { type: String, required: true },
//   password: { type: String, required: true },
//   isVerified: { type: Boolean, default: false },
//   isAdminApproved: { type: Boolean, default: false },
//   userType: { type: String, required: true, enum: ['staff', 'caregiver', 'admin', 'client'], default: 'caregiver' },
//   caregiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: function() { return this.userType === 'client'; } } // Reference to Caregiver
// });

// for the caregivers who signed up to be subscribed to the newsletter
const newsletterSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true,
      unique: true,
  },
  timestamp: {
      type: Date,
      default: Date.now,
  },
});
const NewsletterSignup = mongoose.model('Newsletter', newsletterSchema);


//USE THIS FUNCTION WITH HEAVY CAUTION -- WILL DELETE ALL USERS FROM DATABASE
//USE FOR EARLY TESTING FOR REMOVING GARBAGE INPUTS
//REMOVE BEFORE DEPLOYMENT
app.get('/empty-database', async (req, res) => {
  try {
    await User.deleteMany({});
    res.send('All users deleted successfully.');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error deleting users');
  }
});



// const User = mongoose.model('User', userSchema);

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


  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Verification email sent: ' + info.response);
    }
  });
};

// function to send contact email
const sendContactEmail = (to, subject, text, fullName, phoneNumber, userEmail) => {
  const fullMessage = `${text}\n\nFull Name: ${fullName}\nEmail: ${userEmail}\nPhone Number: ${phoneNumber}`;

  const mailOptions = {
    from: 'cheer.noreply@gmail.com',
    to: to,
    subject: subject,
    text: fullMessage
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error('Failed to send email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};


// Registration Endpoint
app.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber
    });
    await newUser.save();

    // Send verification email to user as before
    sendVerificationEmail(newUser.email, newUser._id);

    res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
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
      // Mark the user as verified
      user.isVerified = true;
      await user.save();
      
      // Send an email to the admin for approval
      sendAdminApprovalEmail(user);
      
      res.send('Email verified successfully. Your account is pending admin approval.');
    } else {
      res.status(404).send('User not found or already verified');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error verifying email');
  }
});

//function sends an email to the cheer email after the user has verified the email and they wont be added to the
//system until approved by the admin email
const sendAdminApprovalEmail = (user) => {
  const approvalLink = `http://localhost:${port}/admin-approve/${user._id}`;
  const mailOptions = {
    from: 'cheer.noreply@gmail.com',
    to: 'cheer.noreply@gmail.com', // Admin email
    subject: 'User Approval Required',
    text: `A new user has registered and requires approval. \n\nUser Info:\nFirst Name: ${user.firstName}\nLast Name: ${user.lastName}\nEmail: ${user.email}\nPhone Number: ${user.phoneNumber}\n\nClick here to approve: ${approvalLink}`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Admin approval email sent: ' + info.response);
    }
  });
};



//endpoint for admin approval
app.get('/admin-approve/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user && !user.isAdminApproved) {
      user.isAdminApproved = true;
      await user.save();
      res.send('User approved successfully.');
    } else {
      res.status(404).send('User not found or already approved');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error approving user');
  }
});

//end point for users to log in to the system
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email first' });
    }
    // Here, implement token generation or session creation as per your auth strategy
    res.status(200).json({ message: 'Login successful', role: user.role }); // Include user role if applicable
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});








// Send contact email endpoint
app.post('/send-contact-email', (req, res) => {
  const { subject, body, fullName, phoneNumber, email } = req.body;
  const recipientEmail = 'cheer.noreply@gmail.com';

  sendContactEmail(recipientEmail, subject, body, fullName, phoneNumber, email);
  
  res.status(200).send('Contact email sent successfully.');
});

// Caregiver Newsletter Signup form
app.post('/subscribe-newsletter', async (req, res) => {
  try {
      const { email } = req.body;

      // check if the email already exists in the database
      const existingCaregiver = await NewsletterSignup.findOne({ email });

      if (existingCaregiver) {
          return res.status(400).json({ message: 'Email already exists' });
      }

      // new caregiver instance
      const newCaregiver = new NewsletterSignup({ email });

      // save to the database
      await newCaregiver.save();

      console.log(`Caregiver with email ${email} has signed up for the newsletter and saved to the database.`);
      res.status(200).json({ message: 'Newsletter signup successful' });
  } catch (error) {
      console.error('Failed to process caregiver newsletter signup:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

//Send newsletter endpoint, sends the given content to everyone in the mailing list database

app.post('/send-newsletter', upload.single('file'), async (req, res) => {
  try {
    const { subject, content } = req.body; // Assume subject and content are sent in the request
    const file = req.file //Get the attached file 

    // Fetch all email addresses from the database
    const subscribers = await NewsletterSignup.find({});

    // Check if there are subscribers
    if (subscribers.length === 0) {
      return res.status(404).json({ message: 'No subscribers found' });
    }

    // Loop through all subscribers and send the email
    subscribers.forEach(subscriber => {
      const mailOptions = {
        from: 'cheer.noreply@gmail.com', // sender address
        to: subscriber.email, // list of receivers
        subject: subject, // Subject line
        text: content, // plain text body
        // html: "<b>Hello world?</b>", // html body (optional)

        attachments:[
          {
            filename: file.originalname,//use orginal file name
            content: file.buffer,//use buffer from the uploaded file
            contentType: file.mimetype//use mimetype from uploaded file

          }
        ]
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });
    });

    res.status(200).json({ message: 'Newsletter sent to all subscribers' });
  } catch (error) {
    console.error('Failed to send newsletter:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.get('/', (req, res) => {
  console.log("test connect successful");
  res.send('Hello from the server!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
//Routes

app.use('/api/users', userRoutes);
