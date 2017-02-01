
angular.module('myapp.services', [])

.factory("encodeUriServices",function () {
	return {
		encode : function(string){
			console.log(string);
			return encodeURIComponent(string).replace(/\"/g,"%22").replace(/\ /g,"%20").replace(/[!'{}]/g,escape);
		}
	}	
	
})

.factory("dateServices" , function($filter){
	var currentDate = function(){
		var d = new Date();
		var date = $filter('date')(d,'dd-MM-yyyy');
		return  date;

	};

	var oneYearAgoDate = function(){
		var d = new Date(new Date().setDate(new Date().getDate()-366));
		var date = $filter('date')(d,'dd-MM-yyyy');
		return date;

	};
	return {
		currentDate : currentDate,
		oneYearAgoDate : oneYearAgoDate
	}
})

.factory("sotckdataServices",function($q,$http,encodeUriServices){


var getMarketDetails = function(ticker) {
	var deferred = $q.defer(),
	query = 'select * from yahoo.finance.quotes where symbol IN (" '+ ticker +' ")',
	merketdetailsUrl ='http://query.yahooapis.com/v1/public/yql?q='+encodeUriServices.encode(query)+'&format=json&env=http://datatables.org/alltables.env';
	console.log(merketdetailsUrl);
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


    