const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    location: {
        type: String,
        required: true
    },
    website: {
        type: String,
    },
    employeesNumber: {
        type: String,
        required: true
    },
    // postedJobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;