(function() {
    'use strict';

    angular
        .module('ui')
        .component('grInputContainer', {
            controller: grInputContainerController,
            require: '?ngModel',
            bindings: {
                'ngModel': '=?'
            }
        });

    grInputContainerController.$inject = ['$element'];
    function grInputContainerController($element) {
        var $ctrl = this;

        $ctrl.$postLink = function () {
            $element.children('select, input, textarea, gr-chips')
                .addClass('gr-control')
                .after('<div class="line"></div>');
        };
    }
})();