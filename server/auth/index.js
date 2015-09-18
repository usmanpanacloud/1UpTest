'use strict';

var express = require('express');
var router = express.Router();
var config = require('../config/environment/index');
var User = require('../api/user/user.model.js');

require('./local/passport').setup(User, config);

router.use('/local', require('./local/index'));

module.exports = router;
