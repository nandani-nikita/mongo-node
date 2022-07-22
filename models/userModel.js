const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    full_name: { type: String, index: true },
    email: { type: String, index: true },
    number: { type: Number },
    city: { type: String },
    url: { type: String },
}, { collection: 'users' });

mongoose.model('User', userSchema);