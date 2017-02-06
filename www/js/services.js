
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

.factory('chartDataCacheService', function(CacheFactory) {

  var chartDataCache;

  if(!CacheFactory.get('chartDataCache')) {

    chartDataCache = CacheFactory('chartDataCache', {
      maxAge: 60 * 60 * 8 * 1000,
      deleteOnExpire: 'aggressive',
      storageMode: 'localStorage'
    });
  }
  else {
    chartDataCache = CacheFactory.get('chartDataCache');
  }

  return chartDataCache;
})



.factory('notesCacheServices',function(CacheFactory){
	var notesCache;

  if(!CacheFactory.get('notesCache')) {
    notesCache = CacheFactory('notesCache', {
      storageMode: 'localStorage'
    });
  }
  else {
    notesCache = CacheFactory.get('notesCache');
  }

  return notesCache;
})

// For fetching NSE and BSE data 
// http://finance.google.com/finance/info?q=NSE:AIAENG,NSE:MARUTI
// https://www.google.com/finance/info?q=BSE&&MARUTI

.factory("sotckdataServices",function($q,$http,encodeUriServices,chartDataCacheService){


var getMarketDetails = function(ticker) {
	var deferred = $q.defer(),
	cacheKey = ticker,
	chartDataCache = chartDataCacheService.get(cacheKey),

	query = 'select * from yahoo.finance.quotes where symbol IN (" '+ ticker +' ")',
	merketdetailsUrl ='http://query.yahooapis.com/v1/public/yql?q='+encodeUriServices.encode(query)+'&format=json&env=http://datatables.org/alltables.env';
	console.log(merketdetailsUrl);
	if (chartDataCache) {
		deferred.resolve(chartDataCache);
	}else
	{
		$http.get(merketdetailsUrl)
		.success(function(json){
      	
      	var jsonData = json.query.results.quote;
      	deferred.resolve(jsonData);
      //console.log(jsonData);
      chartDataCacheService.put(jsonData)

    })

    	.error(function(error){
    	console.log("Details data error" + error);
    	deferred.reject();
   		 });

	}
	/*$http.get(merketdetailsUrl)
		.success(function(json){
      	
      	var jsonData = json.query.results.quote;
      	deferred.resolve(jsonData);
      //console.log(jsonData);
      chartDataCacheService.put(jsonData)

    })

    	.error(function(error){
    	console.log("Details data error" + error);
    	deferred.reject();
   		 });*/

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

})

.factory('notesService' , function(notesCacheServices){

	return {
		getNotes : function(ticker){
			return notesCacheServices.get(ticker);
		},
		addNotes : function(ticker ,note){
			var stockNotes =[];
			if (notesCacheServices.get(ticker)) {
				stockNotes = notesCacheServices.get(ticker);
				stockNotes.push(note);

			}
			else{
				stockNotes.push(note);

			}
			return notesCacheServices.put(ticker,stockNotes);
		} ,
		deleteNotes : function(ticker, index){
			var stockNotes =[];
			stockNotes = notesCacheServices.get(ticker);
			stockNotes.splice(index,1);
			notesCacheServices.put(ticker,stockNotes);
		}
	}

})

.factory("newsFeedServices" , function($q , $http){
	return {
		getNews : function(ticker){
			var deferred = $q.defer(),
			x2js = new X2JS();
			newsUrl = "http://finance.yahoo.com/rss/headline?s="+ticker;
			$http.get(newsUrl)
			.success(function(xml){
				var xmlDocs = x2js.parseXmlString(xml),
				json = x2js.xml2json(xmlDocs),
				jsonData = json.rss.channel.item;
				deferred.resolve(jsonData);
				console.log(jsonData);
			})
			.error(function(error){
				deferred.reject();
				console.log("error in news newsFeedServices" + error);
			});
			return deferred.promise;
			
		}

	};
	

})

;


    