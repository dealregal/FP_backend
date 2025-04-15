const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionName = 'pin';

const PinSchema = new Schema(
  {
    pin: { type: String, required: true }
  },
  { versionKey: false }
);

module.exports = mongoose.model(collectionName, PinSchema, collectionName);
