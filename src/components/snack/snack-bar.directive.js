(function() {
	'use strict';

	angular
		.module('gear')
		.directive('grSnackBar', grSnackBar);

	grSnackBar.$inject = ['grSnack', '$templateCache'];

	function grSnackBar(grSnack, $templateCache) {
		var directive = {
			link: link,
            templateUrl: 'components/snack/snack-bar.directive.html',
			restrict: 'E',
			scope: {
				'grBar': '='
			}
		};
		return directive;
		
		function link(scope, element, attrs) {
		}
	}
})();