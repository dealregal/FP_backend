const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionName = 'users';

const Agent = require("./agent");
const Shop = require("./shop");


const GameUserSchema = new Schema(
  {
    id: { type: Number },
    name: { type: String },
    username: { type: String },
    deviceId: { type: String,  },
    mobileNumber: { type: String,default: '' },
    uniqueId: { type: String },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    chips: { type: Number },
    winningChips: { type: Number },
    referralCode: { type: String },
    profileUrl: { type: String },
    deviceType: { type: String, default: 'Android' },
    loginType: { type: String, default: 'phone' },
    flags: {
      isOnline: { type: Number, default: 0 }
    },
    counters: {
      gameWin: { type: Number, default: 0 },
      gameLoss: { type: Number, default: 0 },
      totalMatch: { type: Number, default: 0 },
    },
    tableId: { type: String, default: '' },
    sckId: { type: String },
    status: { type: Boolean, default: true }, // false Block True Non Block 
    lastLoginDate: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
    isVIP: { type: Number, default: 0 },
    Iscom: { type: Number, default: 0 },
    fcmToken: { type: String, default: '' },
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: Shop },
    greentablebet: [],
    bluetablebet: []
  },
  { versionKey: false }
);

module.exports = mongoose.model(collectionName, GameUserSchema, collectionName);
