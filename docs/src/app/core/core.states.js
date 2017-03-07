(function () {
	'use strict';

	angular
		.module('core')
		.config(coreStates);

	coreStates.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function coreStates($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		$stateProvider
			.state('home', {
				url: '/smn-ui'
			});
	}
})();
