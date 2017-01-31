angular.module('myapp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('myStocksCtrl', ['$scope',
  function($scope){
    $scope.myStockArray =[
                          {ticker :"MSFT"},
                          {ticker :"GOOGL"},
                          {ticker :"FB"},
                          {ticker :"NFLX"},
                          {ticker :"TSLA"},
                          {ticker :"INTC"},
                          {ticker :"GE"},
                          {ticker :"BAC"},
                          {ticker :"AMZN"},
                          {ticker :"C"}

                        ];

  }])

.controller('stockCtrl', ['$scope','$stateParams','$http','sotckdataServices',
  function($scope, $stateParams,$http,sotckdataServices) {
    /*$http.get("http://finance.yahoo.com/webservice/v1/symbols/YHOO/quotes?format=json&view=detail")
    .then(function(jsonData){
      console.log(jsonData.data.list.resources[0].resource.fields);
      //console.log(jsonData);


    });*/


  $scope.ticker = $stateParams.stockTicker;
  
}]);
