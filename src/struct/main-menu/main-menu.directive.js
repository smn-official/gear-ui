(function () {
    'use strict';

    angular
        .module('ui')
        .directive('grMainMenu', grMainMenu);

    grMainMenu.$inject = ['$templateCache'];

    function grMainMenu($templateCache) {
        var directive = {
            // link: link,
            restrict: 'E',
            template: $templateCache.get('app/ui/struct/main-menu/main-menu.directive.tpl.html'),
            scope: {
                'menuList': '=',
                'config': '=?',
                'menuClick': '&?'
            },
            bindToController: true,
            controller: grMainMenuController,
            controllerAs: 'vm'
        };
        return directive;
    }

    grMainMenuController.$inject = ['$scope'];

    function grMainMenuController($scope) {

        var vm = this;
        vm.level = 0;

        if (vm.config) {
            if (!vm.config.submenu)
                vm.config.submenu = 'submenu';
            if (!vm.config.favorite)
                vm.config.favorite = 'favorite';
            if (!vm.config.name)
                vm.config.name = 'name';
            if (!vm.config.icon)
                vm.config.icon = 'icon';
            if (!vm.config.href)
                vm.config.href = 'href';
        }
    }
})();