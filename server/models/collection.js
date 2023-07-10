const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  theme: { type: String, required: true },
  image: { type: String },
  itemName: { type: String, required: true },
  itemDescription: { type: String, required: true },
  itemTags: { type: [String] },
  itemFieldName1: { type: String },
  itemFieldName2: { type: String },
  itemFieldName3: { type: String },
  itemFieldType1: { type: String },
  itemFieldType2: { type: String },
  itemFieldType3: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
