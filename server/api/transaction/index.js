'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./transaction.controller.js');
var auth = require('../../auth/auth.service');
var param = require('../user/user.controller');

router.param('user', auth.isAuthenticated(), param.userParam);
router.get('/:user/transaction', controller.get);

module.exports = router;
