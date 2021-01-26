const { Schema, model, Types } = require('mongoose');

const schema = Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  images: [{ type: Types.ObjectId, ref: 'Image' }]
});

module.exports = model('User', schema);