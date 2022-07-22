const mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
    full_name: { type: String, index: true },
    email: { type: String, index: true },
    team_name: { type: String },
}, { collection: 'teamData' });

mongoose.model('Team', teamSchema);