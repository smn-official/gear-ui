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

        vm.users = [{
            id: 1,
            name: 'Jhon Doe'
        }];

        activate();

        ////////////////

        function activate() {
            console.log('Core controller loaded with success');
        }

        vm.teste = function (string) {
            console.log(string)
        }
        
        vm.busca = function () {
            
        }
    }

})();

