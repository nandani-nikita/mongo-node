const mongoose = require('mongoose');

var otpSchema = new mongoose.Schema({
    otp: { type: Number },
    createdAt: { type: Date, default: new Date(Date.now()) },
    validTill: { type: Date, default: new Date(Date.now()) },
    isVerified: { type: Boolean, default: false }
})

var userSchema = new mongoose.Schema({
    userId: { type: String },
    name: { type: String },
    mobile: { type: Number, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    referralCode: { type: String },
    pin: { type: Number, default: null },
    otpData: otpSchema
});

mongoose.model('User', userSchema);