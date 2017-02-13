(function () {
    'use strict';

    angular
        .module('gear')
        .directive('grAutofocus', grAutofocus);

    grAutofocus.$inject = ['$timeout'];

    /* @ngInject */
    function grAutofocus($timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            $timeout(function () {
                element[0].focus();
            })
        }
    }

})();

