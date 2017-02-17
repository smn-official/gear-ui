(function () {
	'use strict';

	angular
		.module('gear')
		.directive('grTreeViewItem', grTreeViewItemDirective);

	grTreeViewItemDirective.$inject = ['$compile', '$templateCache'];

	function grTreeViewItemDirective($compile, $templateCache) {
		var directive = {
			require: '^grTreeView',
			templateUrl: 'components/tree-view/tree-view-item.directive.html',
			link: link,
			restrict: 'E',
			scope: {
				option: '='
			}
		};
		return directive;

		function link(scope, element, attrs, ctrl) {
			scope.config = ctrl.config;
			scope.actions = ctrl.actions;
			scope.open = open;

			if (ctrl.actionsTemplate) {
				var actionsHtml = $templateCache.get(ctrl.actionsTemplate),
					actionsTemplate = $compile(actionsHtml)(scope);
				element.children('.option-wrap').append(actionsTemplate);
			}

			function open(option, event, clickName) {
                option.open = !option.open;

                if (clickName && !option[scope.config.submenu]) {
                    scope.actions.clickName(option);
				}

                event.preventDefault();
            }
		}
	}
})();