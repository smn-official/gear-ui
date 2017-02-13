(function () {
    'use strict';

    angular
        .module('gear')
        .directive('grMaxlength', grMaxLength);

    function grMaxLength() {
        var directive = {
            restrict: 'A',
            link: link,
            require: ['ngModel', '?^form'],
            scope: {
                grMaxlength: '='
            }
        };
        return directive;

        function link(scope, element, attrs, ctrl) {
            scope.$watch('grMaxlength', function (value, oldValue) {
                element.attr('maxlength', value);
            });
            // ctrl[0].$formatters.unshift(formatValue);
            // ctrl[0].$parsers.unshift(formatValue);
            function formatValue(value) {
                if (!value || !scope.grMaxLength)
                    return value;
                var newValue = value.toString();
                var maxLength = parseInt(scope.grMaxLength);
                if (isNaN(maxLength))
                    return;
                newValue = newValue.substring(0, maxLength);
                var isModelPristine = ctrl[0].$pristine,
                    isFormPristine = ctrl[1] ? ctrl[1].$pristine : false;
                ctrl[0].$setViewValue(newValue);
                ctrl[0].$render();
                isModelPristine && ctrl[0].$setPristine();
                isFormPristine && ctrl[1].$setPristine();
                return newValue;
            }
        }
    }

})();

