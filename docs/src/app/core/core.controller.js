(function () {
    'use strict';

    angular
        .module('core')
        .controller('CoreController', CoreController);

    function CoreController() {
        var vm = this;
        vm.hoje = new Date();
        vm.ontem = new Date();
        vm.ontem.setHours(-1);

        activate();

        ////////////////

        function activate() {
            console.log('Core controller loaded with success');
        }
    }

})();

