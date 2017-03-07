(function () {
    'use strict';

    angular
        .module('smn-ui')
        .directive('uiMaskCpf', uiMaskCpf);

    function uiMaskCpf(uiCpfFilter) {
        var directive = {
            restrict: 'A',
            link: link,
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ctrl) {
            ctrl.$parsers.push(function(value){
                var viewValue = uiCpfFilter(value);
                ctrl.$setViewValue(viewValue);
                ctrl.$render();
                if (viewValue.length === 14)
                    return viewValue.replace(/[^0-9]+/g, '');
                if (!viewValue)
                    return '';
            });

            ctrl.$formatters.push(function(value){
                return uiCpfFilter(value);
            });
        }
    }

})();