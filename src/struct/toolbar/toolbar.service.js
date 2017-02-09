(function () {
    'use strict';

    angular
        .module('ui')
        .factory('grToolbar', grToolbar);

    function grToolbar($timeout) {
        var toolbarTitle,
            flatModeDefaults = {
                active: false,
                breakPoint: '',
                size: ''
            },
            service = {
                getTitle: getTitle,
                setTitle: setTitle,
                clearTitle: clearTitle,
                flatMode: flatModeDefaults,
                resetFlatMode: resetFlatMode
            };
        return service;

        ////////////////

        function getTitle() {
            return toolbarTitle;
        }

        function setTitle(title) {
            toolbarTitle = undefined;
            $timeout(function () {
                toolbarTitle = title;
            });
        }

        function clearTitle() {
            toolbarTitle = undefined;
        }

        function resetFlatMode() {
            service.flatMode = angular.copy(flatModeDefaults);
        }
    }

})();

