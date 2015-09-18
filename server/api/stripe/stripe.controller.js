'use strict';

var config = require('../../config/environment');
var Transaction = require('../transaction/transaction.model');
var stripe = require("stripe")(config.stripe.key);



/**
 * Take token and make payment
 *
 * @param req
 * @param res
 */
exports.payment = function (req, res) {
  console.log('payment');
  var stripeToken = req.body.stripeToken;
  var amount = req.body.amount;
  var currency = req.body.currency;
  var description = req.body.description;
  stripe.charges.create({
    amount: amount,
    currency: currency,
    source: stripeToken,
    description: description || ""
  }, function (err, charge) {
    if (err && err.type === 'StripeCardError') {
      return res.json(err);
    }
    var transaction = new Transaction();
    transaction.userId = req.user;
    transaction.date = new Date();
    transaction.transactionId = charge.balance_transaction;
    transaction.amount = charge.amount;
    transaction.currency = charge.currency;
    transaction.source.id = charge.source.id;
    transaction.source.brand = charge.source.brand;
    transaction.source.country = charge.source.country;
    transaction.save(function (err, data) {
      if (err) {
        return next(err);
      }
      req.user.transactions.push(data);
      req.user.save(function (err, user) {
        if (err) {
          return next(err);
        }
        res.json({success:true,message:'Payment successfully'});
      });
    });
  });
};
