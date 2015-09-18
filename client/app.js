'use strict';

angular.module('fullstackTest', [
  'ui.router',
  'angularPayments',
  'ngCookies',
  'ngSanitize',
  'ngAnimate'
])
  .config(function ($urlRouterProvider, $locationProvider, $httpProvider) {
    Stripe.setPublishableKey('pk_test_XUQZ1hJf1vIredAc5nVfv6yh');

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

  })
  .factory('authInterceptor',
  function ($rootScope, $q, $cookieStore, $location) {
    return {

      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      responseError: function (response) {
        if (response.status === 401) {
          $location.path('/login');
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }

    };
  })

  .run(function ($rootScope, $location, Auth) {

    $rootScope.Auth = Auth;

    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isReadyLogged().catch(function () {
        if (next.authenticate) {
          $location.path('/');
        }
      });
    });

  });
