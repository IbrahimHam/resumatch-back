const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recruiterSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    postedJobs: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }
}, {
    timestamps: true
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);
module.exports = Recruiter;
