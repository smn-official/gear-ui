(function () {
    'use strict';

    angular
        .module('gear')
        .filter('grCapitalize', grCapitalize);

    function grCapitalize() {
        return grCapitalizeFilter;

        ////////////////

        function grCapitalizeFilter(value) {
            return (angular.isString(value) && value.length > 0) ? value[0].toUpperCase() + value.substr(1).toLowerCase() : value;
        }
    }

})();

