(function() {
	'use strict';

	angular
		.module('gear')
		.factory('grWindow', grWindow);

	grWindow.$inject = ['$window', '$rootScope'];

	function grWindow($window, $rootScope) {
		var service = {};

		angular.element($window).bind('scroll', function(){
			$rootScope.$apply(getWindowScroll);
		});

		angular.element($window).bind('resize', function(){
			$rootScope.$apply(getWindowScroll);
		});

		function getWindowScroll() {
			service.scrollX = $window.scrollX;
			service.scrollY = $window.scrollY;
			service.innerWidth = $window.innerWidth;
			service.innerHeight = $window.innerHeight;
		}

		getWindowScroll();

		return service;
	}
})();