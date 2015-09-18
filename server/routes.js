'use strict';

var config = require('./config/environment');

module.exports = function (app) {

  // API
  app.use('/api/users', require('./api/user'));
  app.use('/api/user', require('./api/stripe'));
  app.use('/api/user', require('./api/transaction'));

  // Auth
  app.use('/auth', require('./auth'));

  app.route('/:url(api|app|bower_components|assets)/*')
    .get(function (req, res) {
      res.status(404).end();
    });

  app.route('/*')
    .get(function (req, res) {
      res.sendFile(
        app.get('appPath') + '/index.html',
        { root: config.root }
      );
    });

};
