
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' })
// const dbUrl = process.env.DATABASE;


mongoose.connect('mongodb://localhost:27017/assignment', { useNewUrlparser: true }, (err) => {
    if (!err) {
        // _db  = client.db('dono_lms');
        console.log('Mongo Connection Successful.');
        // return _db
    } else {
        console.log('Mongo Connection Failed');
    }
});

require('./userModel');