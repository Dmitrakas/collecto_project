const mongoose = require('mongoose');

const itemFieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
}, { timestamps: true });

const ItemField = mongoose.model('ItemField', itemFieldSchema);

module.exports = ItemField;
