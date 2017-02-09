(function () {
    'use strict';

    angular
        .module('ui')
        .filter('grInteger', grInteger);

    function grInteger() {
        return grIntegerFilter;

        ////////////////

        function grIntegerFilter(value) {
            if (value === undefined || value === null)
                return null;
            value = value.toString().replace(/\D+/g, '');
            value = value ? parseInt(value) : null;
            return value;
        }
    }

})();

