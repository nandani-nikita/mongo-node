
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/userAndTeam', { useNewUrlparser: true }, (err) => {
    if (!err) {
        console.log('Mongo Connection Successful.');
    } else {
        console.log('Mongo Connection Failed',err);
    }
});

require('./userModel');
require('./teamModel');
