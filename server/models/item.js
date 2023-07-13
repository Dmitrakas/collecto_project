const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tags: { type: [String] },
  fieldValue1: { type: String },
  fieldValue2: { type: String },
  fieldValue3: { type: String },
  collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  likes: { type: Number, default: 0 },
}, { timestamps: true });


const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
