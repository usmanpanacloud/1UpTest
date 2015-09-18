'use strict';

var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var Transaction = require('./transaction.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

/**
 * get user transactions
 *
 * @param req
 * @param res
 */
exports.get = function (req, res) {
  req.user.populate('transactions', function (err, user) {
    if (err) {
      return next(err);
    }
    res.json(user.transactions);
  });
};
