/** @format */

const mongoose = require('mongoose');

const webContentSchema = new mongoose.Schema(
  {
    name: { type: String, required:[true,"Please give a name for this content. must be unique"],unique:true, trim:true },
    content: { type: String },
    imgs: [ String ],
    img: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//* document middleware

//* Query middleware

//* virtual fields

//* after finish save
webContentSchema.post('save', function (next) {
  this.__v = undefined;
});
const WebContent = mongoose.model('webContent', webContentSchema);
module.exports = WebContent;
