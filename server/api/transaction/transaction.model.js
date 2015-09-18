'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
  transactionId: String,
  amount: String,
  currency: String,
  source: {
    id: String,
    brand: String,
    country: String
  },
  date: Date,
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


module.exports = mongoose.model('Transaction', TransactionSchema);
