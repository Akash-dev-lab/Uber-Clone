const mongoose = require('mongoose');

const blacklistedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true, // Ensures the token is unique in the collection
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically sets the current date and time
        expires: 86400, // 24 hours in seconds (TTL index)
    },
});

module.exports = mongoose.model('BlacklistedToken', blacklistedTokenSchema);