
angular.module('myapp.services', [])
.factory("sotckdataServices",function($q,$http){


var getMarketDetails = function(ticker) {
	var deferred = $q.defer(),
	merketdetailsUrl ="http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22"+ ticker +"%22)&format=json&env=http://datatables.org/alltables.env";

	$http.get(merketdetailsUrl)
		.success(function(json){
      	
      	var jsonData = json.query.results.quote;
      	deferred.resolve(jsonData);
      //console.log(jsonData);
    })

    	.error(function(error){
    	console.log("Details data error" + error);
    	deferred.reject();
   		 });
	return deferred.promise;

}



//getPriceData Start here---
var getPriceData = function(ticker) {

		var deferred = $q.defer(),
		 url = "http://finance.yahoo.com/webservice/v1/symbols/"+ ticker +"/quotes?format=json&view=detail";

		$http.get(url)
		.success(function(json){
      	//console.log(jsonData.data.list.resources[0].resource.fields);
      	var jsonData = json.list.resources[0].resource.fields;
      	deferred.resolve(jsonData);
      //console.log(jsonData);
    })

    	.error(function(error){
    	console.log("Price data error" + error);
    	deferred.reject();
   		 });
	return deferred.promise;
};

	

	return {
		getPriceData : getPriceData,
		getMarketDetails : getMarketDetails

		};
 //getPriceData end here---

});


    