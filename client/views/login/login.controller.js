'use strict';

angular.module('fullstackTest')
  .controller('LoginCtrl', function ($location, Auth) {

    var vm = this;

    angular.extend(vm, {

      name: 'Login',

      /**
       * User credentials
       */
      user: { email: 'test@test.com', password: 'test' },

      /**
       * Login method
       */
      login: function () {
        Auth.login(vm.user)
          .then(function () {
            $location.path('/');
          })
          .catch(function (err) {
            vm.error = err;
          });
      }

    });

  });
