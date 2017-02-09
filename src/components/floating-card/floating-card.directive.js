(function () {
	'use strict';

	angular
		.module('ui')
		.directive('grFloatingCard', grFloatingCardDirective);

	grFloatingCardDirective.$inject = ['$templateCache'];

	function grFloatingCardDirective($templateCache) {
		var directive = {
			restrict: 'E',
			transclude: true,
			scope: {
				'backgroundClick': '&'
			},
			template: $templateCache.get('app/ui/components/floating-card/floating-card.directive.tpl.html'),
			link: link
		};
		return directive;
		
		function link(scope, element, attrs) {
			var html = angular.element('html')[0];
			html.style.overflow = 'hidden';
			scope.$on('$destroy', function() {
				html.style.overflow = '';
			});
		}
	}
})();