const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken'); // adjust the path according to your project structure

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password, userType } = req.body;

    // Check if email is in proper format
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
        res.status(400);
        throw new Error('Invalid email format');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        userType
    });

    if (user) {
        // Generate the token after creating the user
        let token = generateToken(user._id);

        if (!token) {
            token = "token";
            res.status(500);
            throw new Error('Token generation failed');

         }
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            userType: user.userType,
            isVerified: user.isVerified,
            isAdminApproved: user.isAdminApproved,
            token,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if (!email) {
        res.status(400);
        throw new Error('Email must be provided');
    }

    if (!password) {
        res.status(400);
        throw new Error('Password must be provided');
    }

    const user = await User.findOne({email});

    if (user && user.isFlagged) {
        res.status(403);
        throw new Error('Your account has been deactivated. Please contact an administrator.');
    }

    if (user && await user.matchPasswords(password)) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            userType: user.userType,
            isVerified: user.isVerified,
            isAdminApproved: user.isAdminApproved,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
});
const changePassword = asyncHandler(async (req, res) => {
    // Check if req.user exists and has an 'id' property
    console.log(req.user);
    if (!req.user || !req.user.id) {
        res.status(401);
        throw new Error('User not authenticated');
    }

    const user = await User.findById(req.user.id);

    if (user && (await user.matchPasswords(req.body.oldPassword))) {
        user.password = req.body.newPassword;
        await user.save();

        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid password');
    }
});
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.isFlagged = req.body.isFlagged;
        if (req.body.isAdmin !== undefined) {
            user.isAdmin = req.body.isAdmin;
        }
        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = { registerUser, authUser, changePassword, getUsers, updateUser };