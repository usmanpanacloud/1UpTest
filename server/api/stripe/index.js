'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./stripe.controller');
var param = require('../user/user.controller');
var auth = require('../../auth/auth.service');

router.param('user', auth.isAuthenticated(), param.userParam);
router.post('/:user/payment', controller.payment);

module.exports = router;
