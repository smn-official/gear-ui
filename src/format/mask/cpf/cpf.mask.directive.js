(function () {
    'use strict';

    angular
        .module('gear')
        .directive('grMaskCpf', grMaskCpf);

    function grMaskCpf(grCpfFilter) {
        var directive = {
            restrict: 'A',
            link: link,
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ctrl) {
            ctrl.$parsers.push(function(value){
                var viewValue = grCpfFilter(value);
                ctrl.$setViewValue(viewValue);
                ctrl.$render();
                if (viewValue.length === 14)
                    return viewValue.replace(/[^0-9]+/g, '');
                if (!viewValue)
                    return '';
            });

            ctrl.$formatters.push(function(value){
                return grCpfFilter(value);
            });
        }
    }

})();