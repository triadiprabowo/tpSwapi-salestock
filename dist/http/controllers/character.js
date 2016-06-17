/*
** Controller: character detail
** SWAPI Sample Application
** @author: Triadi Prabowo
*/

tpSwapi.controller('characterController', function($scope, $Bing, $swapi, $parse) {
	'use strict'

	var tmpData = [];

	// Parsing character data
	$scope.characterData = $parse(characterData)();
	$scope.imageGalleries = [];

	// Search Images in Bing
	$Bing.search.img($scope.characterData.name)
	.success(function(response) {
		for(var i=0; i<response.d.results.length; i++) {
			if(i < 4) {
				tmpData.push(response.d.results[i])		
			}			
		}

		// Image Gallery
		$scope.imageGalleries = tmpData;
	});

	
});