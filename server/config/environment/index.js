'use strict';

var path = require('path');
var _ = require('lodash');

var all = {

  env: process.env.NODE_ENV || 'development',
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 9000,

  stripe: {
    key: 'sk_test_oh4cX3k4aDqpRJHJIX157RX6'
  },

  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  secrets: {
    session: process.env.SESSION_SECRET || 'secretKey'
  }
};

module.exports = _.merge(all, require('./' + all.env + '.js'));
