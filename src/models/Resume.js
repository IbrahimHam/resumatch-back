const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resumeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
    },
    summary: {
        type: String
    },
    contactInfo: {
        phone: { type: String },
        email: { type: String },
        address: { type: String }
    },       
    birthDate: { type: String },
    skills: [{ type: String }],
    experience: [{
        jobTitle: { type: String },
        company: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        description: { type: String }
    }],
    education: [{
        institution: { type: String },
        degree: { type: String },
        startDate: { type: String },
        endDate: { type: String }
    }],
    languages: [{ type: String }],
    references: [{ type: String }],
    certificates: [{
        institution: { type: String },
        title: { type: String },
        date: { type: String }
    }]
}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;