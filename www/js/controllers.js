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
      {ticker :"MSFT" ,name:"Microsoft Corporation.",link:"./img/microsoft.png"},
      {ticker :"GOOGL",name:"Google Inc",link:"./img/google.png"},
      {ticker :"FB",name:"Facebook",link:"./img/facebook.png"},
      {ticker :"NFLX",name:"Netflix",link:"./img/netflix.png"},
      {ticker :"TSLA",name:"Tesla",link:"./img/tesla.png"},
      {ticker :"INTC",name:"Intel Corporation",link:"./img/intel.png"},
      {ticker :"GE", name:"General Electic",link:"./img/microsoft.png"},
      {ticker :"BAC",name:"Bank Of America",link:"./img/microsoft.png"},
      {ticker :"AMZN",name:"Amazon",link:"./img/microsoft.png"},
      {ticker :"C",name:"Citigroup",link:"./img/microsoft.png"},
      {ticker :"INFY",name:"Infosys Inc.",link:"./img/microsoft.png"},
      {ticker :"AAPL",name:"Apple Inc.",link:"./img/microsoft.png"},
      {ticker :"YHOO",name:"Yahoo Inc.",link:"./img/microsoft.png"}

      
];

  }])

.controller('stockCtrl', ['$scope','$stateParams','sotckdataServices','dateServices',
  function($scope, $stateParams,sotckdataServices,dateServices) {
   
  $scope.ticker = $stateParams.stockTicker;
  $scope.chartView = 1;
  $scope.today = new Date();
  

  console.log(dateServices.currentDate());
  console.log(dateServices.oneYearAgoDate());

  $scope.$on('$ionicView.afterEnter',function(){
    getPriceData();
    getMarketDetails();
  });

$scope.displayChart = function(chartRange) {
  $scope.chartView =chartRange;
}

 $scope.mycurrency = 'doller';

function priceToggel(){
 $scope.mycurrency == 'doller' ? 'inr' : 'doller';
}




function getPriceData(){
    var promise = sotckdataServices.getPriceData($scope.ticker);
    promise.then(function(companypriceData){
      console.log(companypriceData);
     $scope.companypriceData = companypriceData;
       //console.log($scope.companyname);
   });

    //colorFlag for change %
    
    
}



function getMarketDetails(){
    var promise = sotckdataServices.getMarketDetails($scope.ticker);
    promise.then(function(marketDetails){
      $scope.marketDetails = marketDetails;
      console.log(marketDetails);
     
   });

}



   
  
}]); // Stock Controller end here---
