const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resumeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    summary: {
        type: String
    },
    contactInfo: {
        phone: { type: String },
        email: { type: String },
        address: { type: String }
    },       
    skills: [{ type: String }],
    experience: [{
        jobTitle: { type: String },
        company: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String }
    }],
    education: [{
        institution: { type: String },
        degree: { type: String },
        startDate: { type: Date },
        endDate: { type: Date }
    }],
    languages: [{ type: String }],
    references: [{ type: String }],
    certificates: [{
        institution: { type: String },
        title: { type: String },
        date: { type: Date }
    }]
}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;