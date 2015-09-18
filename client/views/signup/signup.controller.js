'use strict';

angular.module('fullstackTest')
  .controller('SignupCtrl', function ($location, Auth) {

    var vm = this;

    angular.extend(vm, {

      name: 'Register',

      /**
       * User credentials
       */
      user: { email: 'test@test.com', password: 'test' , password2: 'test' },

      /**
       * Signup
       */
      signup: function () {
        Auth.signup(vm.user)
          .then(function () {
            $location.path('/');
          })
          .catch(function (err) {
            vm.error = err;
          });
      }

    });

  });
