(function () {
	'use strict';

	angular
		.module('gear')
		.component('grSwitch', {
            controller: grSwitchController
        });

	grSwitchController.$inject = ['$element'];

	function grSwitchController($element) {
	    var $ctrl = this;
        $ctrl.$postLink = function () {
            $element
                .wrapInner('<label></label>');
            $element
                .find('input')
                .addClass('gr-switch')
                .after('<div class="switch-cover"><div class="track"></div><div class="thumb-container"><div class="thumb"></div></div></div>');
        }
	}
})();