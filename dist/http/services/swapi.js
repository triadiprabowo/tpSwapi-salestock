/*
** HTTP Request Swapi.co Ajax Service
** tpSwapi sample application
** @author: Triadi Prabowo
*/

tpSwapi.factory('$swapi', function($http) {
	return {
		getPeople: function(id) {
			return $http.get($constant.SWAPI_URL+'people/'+id);
		},
		getFilms: function(id) {
			return $http.get($constant.SWAPI_URL+'films/'+id);
		}
	}
});