const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    resumeData: { type: Schema.Types.ObjectId, ref: 'Resume'},
    TemplateLink: String
  }, { timestamps: true });

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;