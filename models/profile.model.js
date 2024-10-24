const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const profileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstname: {
        type: String,
        trim: true,
        required: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    profileImage: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);

