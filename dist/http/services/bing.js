/*
** HTTP Request Bing API
** tpSwapi sample application
** @author: Triadi Prabowo
*/

tpSwapi.factory('$Bing', function($http) {
	return {
		search: {
			img: function(keyword) {
				return $http.get('/app/bing/images/'+keyword);
			}
		}
	}
});