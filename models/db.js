
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' })

mongoose.connect('mongodb://localhost:27017/assignment', { useNewUrlparser: true }, (err) => {
    if (!err) {
        console.log('Mongo Connection Successful.');
    } else {
        console.log('Mongo Connection Failed');
    }
});

require('./userModel');