const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide a first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please provide a last name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide a phone number'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        minlength: 6,
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: 'Passwords do not match'
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdminApproved: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        required: [true, 'Please provide a user type'],
        enum: ['staff', 'caregiver', 'admin', 'client'],
        default: 'caregiver'
    },
    caregiverEmail: {
        type: String,
        required: function() { return this.userType === 'client'; }
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(15);
    this.password = await bcrypt.hash(this.password, salt)
    next();
});

userSchema.methods.matchPasswords = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);

};


const User = mongoose.model('User', userSchema);
module.exports = User;