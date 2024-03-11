const nodemailer = require('nodemailer');
const User = require('../models/user');
const generateToken = require('../utils/generateToken'); 
const { getUsers } = require('../controllers/userController');

// set up transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'cheer.noreply@gmail.com', 
    pass: 'htzd nxpi zulw eabv' 
  }
});


// function to send verification email
const sendVerificationEmail = async (userEmail) => {
    const user = await User.findOne({ email: userEmail });
    const verificationLink = `http://localhost:3001/api/users/verify/${user._id}`; 
    const mailOptions = {
    from: 'cheer.noreply@gmail.com',
    to: userEmail,
    subject: 'Verify Your Email',
    text: `Thank you for registering. Please click on the following link to verify your email: ${verificationLink}`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error('Error sending verification email:', error);
    } else {
      console.log('Verification email sent:', info.response);
    }
  });
};

const sendAdminApprovalEmail = async (user) => {

  const approvalLink = `http://localhost:3001/api/users/admin-approve/${user._id}`; 
  const mailOptions = {
    from: 'cheer.noreply@gmail.com',
    to: 'cheer.noreply@gmail.com', 
    subject: 'User Approval Required',
    text: `A new user has registered and requires approval. \n\nUser Info:\nFirst Name: ${user.firstName}\nLast Name: ${user.lastName}\nEmail: ${user.email}\nPhone Number: ${user.phoneNumber}\n\nClick here to approve: ${approvalLink}`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error('Error sending admin approval email:', error);
    } else {
      console.log('Admin approval email sent:', info.response);
    }
  });
};

const sendConfirmation = async (user) => {

    userEmail = `${user.email}`;
    const mailOptions = {
      from: 'cheer.noreply@gmail.com',
      to: userEmail, 
      subject: 'Your Account Has Been Approved!',
      text: `Your account has been approved by the admin. You can now log in to your account.`
    };
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.error('Error sending confirmation email:', error);
      } else {
        console.log('Confirmation email sent:', info.response);
      }
    });
  };

module.exports = { sendVerificationEmail, sendAdminApprovalEmail, sendConfirmation };
