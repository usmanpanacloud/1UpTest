'use strict';

angular.module('fullstackTest')
  .controller('HomeCtrl', function ($scope, Payment) {
    var scope = $scope;
    angular.extend(scope, {
      name: 'HomeCtrl',
      tab: '',
      selectTab: function (t) {
        scope.tab=t
      },
      isSelectTab: function (t) {
        return scope.tab==t
      },
      order: {
        amount: 1000,
        currency: 'USD',
        description: 'abc product'
      },
      totalAmount: 1000,
      process: false,
      stripeError: '',
      paymentSuccessful: false,
      stripeCallback: function (code, result) {
        console.log(result);
        if (result.error) {
          scope.stripeError = result.error.message;
        } else {
          scope.stripeError = false;
          scope.paymentSuccessful = false;
          Payment.makePayment({
            amount: scope.order.amount,
            currency: scope.order.currency,
            description: scope.order.description,
            stripeToken: result.id
          })
            .then(function (data) {
              if(data.success){
                scope.paymentSuccessful = data;
                Payment.getTransactions()
                  .then(function (data) {
                    scope.transactions=data
                  })
              }else{
                scope.stripeError = data;
              }
            })
            .catch(function () {

            })
        }
      },
      transactions:[]
    });
    scope.selectTab('1');
    Payment.getTransactions()
      .then(function (data) {
        scope.transactions=data
      })
  })
;
