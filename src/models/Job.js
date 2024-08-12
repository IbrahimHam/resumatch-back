const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        skill: { type: String },
        level: { type: String }
    }],
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    jobType: { type: String },
    location: { type: String },
    postedDate: {
        type: Date,
        default: Date.now
    },
    tags: [{ type: String }]
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;