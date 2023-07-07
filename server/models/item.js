const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  tags: { type: [String] },
  fieldName1: { type: String },
  fieldName2: { type: String },
  fieldName3: { type: String },
  fieldType1: { type: String },
  fieldType2: { type: String },
  fieldType3: { type: String },
  collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
