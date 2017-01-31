
angular.module('myapp.services', [])
.factory("sotckdataServices",function($q,$http){

	var getPriceData = function() {

		var deferred = $q.defer(),
		 url = "http://finance.yahoo.com/webservice/v1/symbols/"+ ticker +"/quotes?format=json&view=detail";

		$http.get(url)
    	.sucess(function(json){
      	//console.log(jsonData.data.list.resources[0].resource.fields);
      	var jsonData = json.list.resources[0].resource.fields;
      	deferred.resolve(jsonData);
      //console.log(jsonData);
    })

    .eroor(function(eroor){
    	console.log("Price data error" + error);
    });
		
	};

	

	return {
		getPriceData : getPriceData;

		};

})
;


    