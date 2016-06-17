/*
** Controller: films detail
** SWAPI Sample Application
** @author: Triadi Prabowo
*/

tpSwapi.controller('moviesController', function($scope, $Bing, $swapi, $parse) {
	'use strict'

	$scope.movieData = $parse(movieData)();

	console.log($scope.movieData)

	// Search Images in Bing
	$Bing.search.img($scope.movieData.title)
	.success(function(response) {
		
		// Image Gallery
		$scope.movieCover = response.d.results[0].MediaUrl;
	});

	$scope.listCharacters = [];

	// Characters
	$scope.getCharacters = function(index, data, childData) {
		var character = data.characters[index];
		character = character.substr(0, character.length - 1);
		character = character.substr(character.lastIndexOf('/') + 1);

		console.log(character);

		$swapi.getPeople(character)
		.success(function(response) {
			
			if(index+1 < data.characters.length) {
				index++;

				var id = response.url;
				id = id.substr(0, id.length - 1);
				id = id.substr(id.lastIndexOf('/') + 1);

				// Inject ID into the object
				response.id = id;

				childData.push(response);
				$scope.getCharacters(index, data, childData);
			}
			else {
				$scope.showCharacterLoading = false;
				$scope.listCharacters = childData;
			}
		});
	}

	var tmpData = [];
	$scope.getCharacters(0, $scope.movieData, tmpData);

	$scope.showCharacterLoading = true;
});