const mongoose = require('mongoose');

const itemTagSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  tagId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true },
});

const ItemTag = mongoose.model('ItemTag', itemTagSchema);

module.exports = ItemTag;
