(function() {
	'use strict';

	angular
		.module('ui')
		.directive('grSnackContainer', grSnackContainer);

	grSnackContainer.$inject = ['grSnack', '$templateCache', '$timeout'];

	function grSnackContainer(grSnack, $templateCache, $timeout) {
		var directive = {
			link: link,
			template: $templateCache.get('app/ui/components/snack/snack-container.directive.tpl.html'),
			restrict: 'E'
		};
		return directive;
		
		function link(scope, element, attrs) {
			var timeout;
			scope.bars = [];
			grSnack.newAdded(function (bar) {
				// TENTAR TROCAR O NG-REPEAT POR INSERIR UM ELEMENTO
				// USANDO O $animate.enter PRA USAR OS CALLBACK -~
				bar = angular.extend({}, grSnack.getDefaults(), bar);
				scope.bars.push(bar);
				if (scope.bars.length == 1)
					timerBar();
			});
			function finishTimeout() {
				scope.bars.shift();
				if (scope.bars.length)
					timerBar();
			}
			function timerBar() {
				if (scope.bars.length && scope.bars[0].delay)
					timeout = $timeout(finishTimeout, scope.bars[0].delay);
			}
			grSnack.onHide(function () {
				if (timeout)
					$timeout.cancel(timeout);
				finishTimeout();
			});
		}
	}
})();