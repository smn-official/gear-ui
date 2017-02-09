(function() {
	'use strict';

	angular
		.module('ui')
		.directive('grMenuList', grMenuList);

	grMenuList.$inject = ['$templateCache'];

	function grMenuList($templateCache) {
		var directive = {
			require: '^grMainMenu',
			link: link,
			restrict: 'E',
			template: $templateCache.get('app/ui/struct/main-menu/menu-list/menu-list.directive.tpl.html'),
			scope: {
				'list': '=',
				'parentLevel': '='
			}
		};
		return directive;
		
		function link(scope, element, attrs, ctrl) {
			scope.level = scope.parentLevel + 1;
			scope.config = ctrl.config;
		}
	}
})();