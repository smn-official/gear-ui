(function () {
    'use strict';

    angular
        .module('gear')
        .directive('grTrigger', grTrigger);

    function grTrigger() {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                'grTrigger': '@',
                'grTriggerEvent': '@'
            }
        };
        return directive;

        function link(scope, element, attrs) {
            element.bind(scope.grTriggerEvent, function () {
                angular.element(scope.grTrigger).trigger(scope.grTriggerEvent);
            });
        }
    }

})();

