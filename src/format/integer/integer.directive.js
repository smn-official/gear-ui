(function () {
    'use strict';

    angular
        .module('gear')
        .directive('grInteger', grInteger);

    grInteger.$inject = ['grIntegerFilter'];

    function grInteger(grIntegerFilter) {
        var directive = {
            restrict: 'A',
            link: link,
            require: 'ngModel',
            scope: {
                grIntegerDigitMax: '=?'
            }
        };
        return directive;

        function link(scope, element, attrs, ctrl) {
            ctrl.$parsers.push(function(value){
                var viewValue = formatValue(value);
                ctrl.$setViewValue(viewValue);
                ctrl.$render();
                return viewValue;
            });
            ctrl.$formatters.push(formatValue);
            function formatValue(value) {
                var newValue = grIntegerFilter(value);
                if (scope.grIntegerDigitMax && typeof newValue === 'number') {
                    var maxDigit = parseInt(scope.grIntegerDigitMax);
                    if (!isNaN(maxDigit)) {
                        newValue = parseInt(newValue.toString().substring(0, maxDigit));
                    }
                }
                return newValue;
            }
        }
    }

})();

