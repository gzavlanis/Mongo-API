const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.String, ref: 'Users', required: true
    },
    title: {
        required: true, type: String
    },
    start: {
        required: true, type: Date, default: Date.now
    },
    end: {
        required: true, type: Date, default: Date.now
    },
    description: {
        required: true, type: String
    },
    created: {type: Date, default: Date.now}
});

let Event = mongoose.model('Events', eventSchema);
module.exports = Event;