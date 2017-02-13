(function() {
	'use strict';

	angular
		.module('gear')
		.directive('grMenuItem', grMenuItem);

	grMenuItem.$inject = ['$compile', '$templateCache'];

	function grMenuItem($compile, $templateCache) {
		var directive = {
			require: '^grMainMenu',
			link: link,
			restrict: 'E',
			template: $templateCache.get('app/ui/struct/main-menu/menu-item/menu-item.directive.tpl.html'),
			scope: {
				'item': '=',
				'list': '=',
				'level': '=',
				'isOpen': '='
			}
		};
		return directive;

		function link(scope, element, attrs, ctrl) {
			scope.isOpen = false;
			scope.menuClick = ctrl.menuClick;
			scope.config = ctrl.config;
			scope.openMenu = function() {
				if (scope.item[scope.config.submenu])
					scope.isOpen = !scope.isOpen;
			};
			scope.buttonOffset = scope.level != 1 ? (36 * (scope.level - 1) + 'px') : 0;
			if (scope.list) {
				$compile('<gr-menu-list class="drawer-slide-vertical" list="list" config="config" parent-level="level" ng-hide="!isOpen"></gr-menu-list>')(scope, function (cloned, scope){
					element.append(cloned);
				});
			}
		}
	}
})();