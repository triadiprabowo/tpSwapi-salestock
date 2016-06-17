/*
** Directive Resize Image Photo
** SWAPI Sample Application
** @author: Triadi Prabowo
*/

tpSwapi.directive('resizeImage', function($rootScope) {
	return {
		restrict: 'A',
		link: function($scope, element, attr) {
			var totalPhoto = parseInt(attr.resizeImage),
				parentWidth = document.getElementsByClassName('page-wrap')[0].offsetWidth,
				fitSize = (parentWidth / totalPhoto) - 25;

			// Element Styling
			element.css({
				width: (fitSize)+'px',
				height: (fitSize)+'px'
			});

			$scope.setSize = fitSize+'px';
		}
	}
});