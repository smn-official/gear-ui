(function(){
	'use strict';

	angular
		.module('ui')
		.directive('grSlide', grSlide);

	function grSlide(){
		var directive = {
			restrict: 'AE',
			priority: 1,
			scope: {
				onActive: '&?',
				onInactive: '&?'
			},
			templateUrl: 'app/ui/components/slider/slide.directive.tpl.html',
			transclude: true,
			require: '^grSlider',
			link: link
		};

		return directive;

		function link(scope, element, attributes, grSliderController){
			scope.index = null;
			scope.active = false;
			scope.ctrl = grSliderController;
			scope.element = element;
			grSliderController.addSlide(scope);
		}
	}
})();