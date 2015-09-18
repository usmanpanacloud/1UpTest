'use strict';

angular.module('fullstackTest')
  .factory('Auth', function ($rootScope, $cookieStore, $q, $http,$state) {

    var _user = {};
    var _ready = $q.defer();

    if ($cookieStore.get('token')) {
      $http.get('/api/users/me')
        .then(function (res) {
          _user = res.data;
        })
        .finally(function () {
          _ready.resolve();
        });
    } else {
      _ready.resolve();
    }

    /**
     * Signup
     *
     * @param user
     * @returns {promise}
     */
    var signup = function (user) {
      var deferred = $q.defer();
      $http.post('/api/users', user)
        .then(function (res) {
          _user._id = res.data.userId;
          $cookieStore.put('token', res.data.token);
          deferred.resolve();
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    /**
     * Login
     *
     * @param user
     * @returns {promise}
     */
    var login = function (user) {
      var deferred = $q.defer();
      $http.post('/auth/local', user)
        .then(function (res) {
          _user._id = res.data.userId;
          $cookieStore.put('token', res.data.token);
          deferred.resolve();
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    /**
     * Logout
     */
    var logout = function () {
      $cookieStore.remove('token');
      _user = {};
      $state.go('login')
    };

    /**
     * Check if the user is logged
     *
     * @returns {boolean}
     */
    var isLogged = function () {
      return _user.hasOwnProperty('_id');
    };

    /**
     * Check if the user is logged after the ready state
     *
     * @returns {Promise}
     */
    var isReadyLogged = function () {
      var def = $q.defer();
      _ready.promise.then(function () {
        if (_user.hasOwnProperty('_id')) {
          def.resolve();
        } else {
          def.reject();
        }
      });
      return def.promise;
    };

    /**
     * Returns the user
     *
     * @returns {object}
     */
    var getUser = function () {
      return _user;
    };
    return {
      getUser: getUser,
      login: login,
      logout: logout,
      signup: signup,
      isLogged: isLogged,
      isReadyLogged: isReadyLogged
    }
  });
