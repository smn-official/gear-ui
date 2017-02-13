(function () {
    'use strict';

    angular
        .module('gear')
        .directive('grMaskPhone', grMaskPhone);

    function grMaskPhone(grPhoneFilter) {
        var directive = {
            restrict: 'A',
            link: link,
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ctrl) {
            ctrl.$parsers.push(function(value){
                var viewValue = grPhoneFilter(value);
                ctrl.$setViewValue(viewValue);
                ctrl.$render();
                if (viewValue.length === 14 || viewValue.length === 15)
                    return viewValue.replace(/[^0-9]+/g,'');
                if (!viewValue)
                    return '';
            });

            ctrl.$formatters.push(function(value){
                return grPhoneFilter(value);
            });
        }
    }

})();