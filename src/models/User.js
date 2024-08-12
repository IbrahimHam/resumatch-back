const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    preferences: {
        location: String,
        jobType: String,
        industry: String
      },
    resume: { type: Schema.Types.ObjectId, ref: 'Resume'},
    templates: [{ type: Schema.Types.ObjectId, ref: 'Template' }],
    appliedJobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;