'use strict';

angular.module('fullstackTest')
  .factory('Payment', function ($rootScope, $cookieStore, $q, $http,Auth) {

    /**
     * MakePayment
     *
     * @param user
     * @returns {promise}
     */
    var makePayment = function (data) {
      var id =Auth.getUser()._id;
      var deferred = $q.defer();
      $http.post('/api/user/'+id+'/payment', data)
        .then(function (res) {
          deferred.resolve(res.data);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    /**
     * Return Transactions list
     *
     * @returns {promise}
     */
    var getTransactions = function () {
      var deferred = $q.defer();
      var id =Auth.getUser()._id;
      $http.get('/api/user/'+id+'/transaction')
        .then(function (res) {
          deferred.resolve(res.data);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    return {
      makePayment: makePayment,
      getTransactions: getTransactions
    }
  });
