/*
** Angular Run Module
** SWAPI Sample Application
** @author: Triadi Prabowo
*/

tpSwapi.run(function($rootScope) {
	$rootScope.safeUrl = function(link) {
		return $sce.trustAsResourceUrl(link);
	}
});