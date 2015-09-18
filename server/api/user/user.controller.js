'use strict';

var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var User = require('./user.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Creates a new user in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  User.create(req.body, function (err, user) {
    if (err) { return handleError(res, err); }
    var token = jwt.sign(
      { _id: user._id },
      config.secrets.session,
      { expiresInMinutes: 60 * 5 }
    );
    res.status(201).json({ token: token, userId: user._id });
  });
};

/**
 * Return the current logged user.
 *
 * @param req
 * @param res
 */
exports.getMe = function (req, res) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -passwordHash', function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.json(401); }
    res.status(200).json(user);
  });
};



/**
 * Param get user details
 *
 * @param req
 * @param res
 * @param next
 * @param id
 */
exports.userParam = function (req, res, next, id) {
  console.log('userParam');
  User.findById(id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error('user not found'));
    }
    req.user = user;
    return next();
  });
};
