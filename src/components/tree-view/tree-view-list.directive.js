(function() {
	'use strict';

	angular
		.module('ui')
		.directive('grTreeViewList', grTreeViewListDirective);

	grTreeViewListDirective.$inject = ['$timeout'];

	function grTreeViewListDirective($timeout) {
		var directive = {
			require: '^grTreeView',
			link: link,
			restrict: 'E',
			templateUrl: 'app/ui/components/tree-view/tree-view-list.directive.html',
			scope: {
				list: '='
			}
		};
		return directive;
		
		function link(scope, element, attrs, ctrl) {
		}
	}
})();