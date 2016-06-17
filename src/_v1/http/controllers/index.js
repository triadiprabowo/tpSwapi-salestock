/*
** Controller: indexController
** SWAPI Sample Application
** @author: Triadi Prabowo
*/

tpSwapi.controller('indexController', function($scope, $swapi, $Bing, $sce, $q, $http) {
	'use strict'

	$scope.selectedPeople = {};

	$swapi.getPeople(1)
	.success(function(data) {
		$scope.selectedPeople = {
			bio: data,
			movies: []
		}

		var id = $scope.selectedPeople.bio.url;
		id = id.substr(id.lastIndexOf('/') - 1, 1);
		$scope.selectedPeople.bio.id = id;

		var data = []

		for(var i=0; i < $scope.selectedPeople.bio.films.length; i++) {			
			data.push($http.get($scope.selectedPeople.bio.films[i]))
		}

		$q.all(data).then(function(response) {
			$scope.selectedPeople.movies = response;

			
			for(var i=0; i < $scope.selectedPeople.movies.length; i++) {
				var tmpId = $scope.selectedPeople.movies[i].data.url;
				tmpId = tmpId.substr(tmpId.lastIndexOf('/') - 1, 1);

				$scope.selectedPeople.movies[i].data.id = tmpId;
			}
		});

		$Bing.search.img($scope.selectedPeople.bio.name)
		.success(function(response) {
			$scope.imageResults = response.d.results;
		});
	})
	.error(function(err) {
		console.log(err);
	});
});