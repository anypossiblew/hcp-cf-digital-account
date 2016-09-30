'use strict';

let mongoose = require('mongoose');

let messageSchema = mongoose.Schema({
    id: String,
    createdTime: String,
    eventType: String,
    text: String,
    created: Boolean
});

let Message = mongoose.model('Message', messageSchema);

module.exports = Message;
