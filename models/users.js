const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event"}],
    firstName: {
        required: [true, "First name is required"], type: String
    },
    lastName: {
        required: [true, "Last name is required"], type: String
    },
    username: {
        required: [true, "You must create a username"], type: String
    },
    password: {
        required: [true, "A password is required for your account."], type: String
    },
    created: {type: Date, default: Date.now}
});

let User = mongoose.model('Users', userSchema);
module.exports = User;