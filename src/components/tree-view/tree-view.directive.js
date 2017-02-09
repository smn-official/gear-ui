(function() {
	'use strict';

	angular
		.module('ui')
		.directive('grTreeView', grTreeViewDirective);

	grTreeViewDirective.$inject = ['$timeout'];

	function grTreeViewDirective($timeout) {
		var directive = {
			bindToController: true,
			controller: grTreeViewController,
			controllerAs: 'vm',
			restrict: 'E',
			templateUrl: 'app/ui/components/tree-view/tree-view.directive.html',
			scope: {
				'list': '=',
				'config': '=?',
				'optionClick': '&?',
				'actions': '=?',
				'actionsTemplate': '@?'
			},
		};
		return directive;
	}
	function grTreeViewController () {
		var vm = this;

		vm.config = vm.config || {};

		if (!vm.config.submenu)
			vm.config.submenu = 'submenu';
		if (!vm.config.name)
			vm.config.name = 'name';
		if (!vm.config.href)
			vm.config.href = 'href';
	}
})();