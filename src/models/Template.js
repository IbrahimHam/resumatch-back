const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    resumeData: { type: Schema.Types.ObjectId, ref: 'Resume'},
    templateLink: String
  }, { timestamps: true });

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;