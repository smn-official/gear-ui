(function () {
	'use strict';

	angular
		.module('gear')
		.component('grOption', {
            controller: grOptionController
        });

	grOptionController.$inject = ['$element'];

	function grOptionController($element) {
	    var $ctrl = this;
        $ctrl.$postLink = function () {
            $element
                .wrapInner('<label></label>');
            $element
                .find('input')
                .addClass('gr-option')
                .after('<div class="gr-option-shell"><div class="gr-option-fill"></div><div class="gr-option-mark"></div></div>');
        }
	}
})();