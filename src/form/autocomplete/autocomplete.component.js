(function() {
    'use strict';

    angular
        .module('ui')
        .component('grAutocomplete', {
            controller: grAutocompleteController,
            require: {
                ngModelCtrl: 'ngModel'
            },
            templateUrl: 'app/ui/form/autocomplete/autocomplete.tpl.html',
            bindings: {
                'ngModel': '=',
                'grItems': '=',
                'required': '=',
                'grItemsValue': '@',
                'grPrimaryInfo': '@',
                'grSecondaryInfo': '@',
                'grLabel': '@',
                'grTrackBy': '@',
                'grSearchQuery': '=searchQuery',
                'searchFunction': '=grSearchFunction',
                'selectFunction': '=grSelectFunction',
                'placeholder': '@',
                'name': '@'
            }
        });

    function grAutocompleteController($element, $timeout) {
        var $ctrl = this;
        $ctrl.ngModel = $ctrl.ngModel || [];
        $ctrl.grItemsFiltered = [];
        $ctrl.focusedIndex = 0;
        $ctrl.$onInit = function () {
            $element.attr('tabindex', -1);
            $element.bind('click', function (e) {
                if (angular.element(e.target).is('gr-autocomplete'))
                    $element.find('input').focus();
            });
            $element.on('focus', '> *', function (e) {
                $element.addClass('gr-focused');
            });
            $element.on('blur', '> *', function (e) {
                $element.removeClass('gr-focused');
            });
        };

        $ctrl.inputKeyAction = function (event) {
            switch (event.which) {
                case 8:
                case 37:
                    if ($ctrl.ngModel && !$ctrl.searchQuery)
                        $element.children('input').prev().focus();
                    break;
                case 38:
                    $ctrl.focusedIndex = !$ctrl.grItemsFiltered.length ? null : $ctrl.focusedIndex ? $ctrl.focusedIndex - 1 : $ctrl.grItemsFiltered.length - 1;
                    break;
                case 40:
                    $ctrl.focusedIndex = !$ctrl.grItemsFiltered.length ? null : $ctrl.grItemsFiltered.length - 1 === $ctrl.focusedIndex ? 0 : $ctrl.focusedIndex + 1;
                    break;
                case 13:
                    if ($ctrl.searchQuery && !$ctrl.grItems) {
                        $ctrl.searchQuery = '';
                    } else if ($ctrl.grItemsFiltered) {
                        if (typeof $ctrl.focusedIndex === 'number')
                            $ctrl.selectItem($ctrl.grItemsFiltered[$ctrl.focusedIndex]);
                    }
                    event.preventDefault();
                    break;
            }
        };

        var hideTimeout;
        var searchTimeout;
        $ctrl.itemsShown = false;
        $ctrl.showItems = function () {
            $timeout.cancel(hideTimeout);
            $ctrl.itemsShown = true;
            $timeout(function () {
                $ctrl.focusedIndex = $ctrl.grItemsFiltered.length ? 0 : null;
            });
        };
        $ctrl.hideItems = function () {
            hideTimeout = $timeout(function () {
                $ctrl.itemsShown = false;
                $ctrl.focusedIndex = $ctrl.grItemsFiltered.length ? 0 : null;
            });
        };
        $ctrl.blur = function (query) {
            $ctrl.searchFunction(query);
            $ctrl.showItems()
        };

        $ctrl.searchItem = function (query) {
            $timeout.cancel(searchTimeout);
            searchTimeout = $timeout(function () {
                $ctrl.searchFunction(query);
                $ctrl.showItems();
            }, 300);
        };

        $ctrl.selectItem = function (item) {
            $ctrl.focusedIndex = $ctrl.grItemsFiltered.length ? 0 : null;
            $ctrl.ngModel = $ctrl.grItemsValue ? item[$ctrl.grItemsValue] : item;
            $ctrl.ngModelCtrl.$modelValue = $ctrl.ngModel;
            $ctrl.ngModelCtrl.$setDirty();
            $element.find('input').focus();
            $ctrl.selectFunction && $ctrl.selectFunction(item);
            $timeout(function () {
                $ctrl.searchQuery = $ctrl.ngModel[$ctrl.grPrimaryInfo];
                $ctrl.hideItems();
            });
        };
    }
})();