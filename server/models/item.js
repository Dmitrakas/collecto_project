const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
