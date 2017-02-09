(function() {
    'use strict';

    angular
        .module('gear')
        .component('grChips', {
            controller: grChipsController,
            require: {
                ngModelCtrl: 'ngModel'
            },
            templateUrl: 'app/ui/form/chips/chips.tpl.html',
            bindings: {
                'ngModel': '=',
                'grItems': '=',
                'required': '=',
                'grItemsValue': '@',
                'grPrimaryInfo': '@',
                'chipTemplateUrl': '@',
                'grItemsAllowCustom': '@',
                'changeFunction': '=?',
                'grTrackBy': '@',
                'grSearchQuery': '=searchQuery',
                'placeholder': '@',
                'secondaryPlaceholder': '@',
                'grLimit': '=',
                'min': '=',
                'max': '=',
                'name': '@'
            }
        });

    function grChipsController($element, $timeout) {
        var $ctrl = this;
        $ctrl.ngModel = $ctrl.ngModel || [];
        $ctrl.grItemsFiltered = [];
        $ctrl.focusedIndex = 0;
        $ctrl.$onInit = function () {
            $element.attr('tabindex', -1);
            $element.bind('click', function (e) {
                if (angular.element(e.target).is('gr-chips'))
                    $element.find('input').focus();
            });
            $element.on('focus', '> *', function (e) {
                $element.addClass('gr-focused');
            });
            $element.on('blur', '> *', function (e) {
                $element.removeClass('gr-focused');
            });
            $ctrl.ngModelCtrl.$validators.min = isMinValid;
        };

        function isMinValid(value) {
            return !angular.isNumber($ctrl.min) || value.length >= $ctrl.min;
        }

        function isMaxValid(value) {
            return !angular.isNumber($ctrl.max) || value.length <= $ctrl.max;
        }

        $ctrl.chipKeyAction = function (event, index) {
            if ([8,46].indexOf(event.which) > -1) {
                $ctrl.removeChip(index);
                var focusIndex = !$ctrl.ngModel.length ? 1 : (index === $ctrl.ngModel.length ? index - 1 : index + 1);
                $element.children().eq(focusIndex).focus();
            }
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
                        $ctrl.ngModel.indexOf($ctrl.searchQuery) === -1 && $ctrl.ngModel.push(angular.copy($ctrl.searchQuery));
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
        $ctrl.filterRemoveSelected = function (item) {
            if ($ctrl.grTrackBy) {
                for (var i = 0; i < $ctrl.ngModel.length; i++) {
                    if ($ctrl.ngModel[i][$ctrl.grTrackBy] === item[$ctrl.grTrackBy])
                        return false;
                }
                return true;
            }
            return $ctrl.grItemsValue ? $ctrl.ngModel.indexOf(item[$ctrl.grItemsValue]) === -1 : item;
        };
        $ctrl.checkFilteredItems = function () {
            $timeout(function () {
                $ctrl.focusedIndex = $ctrl.grItemsFiltered.length ? $ctrl.focusedIndex || 0 : null;
            });
        };
        $ctrl.selectItem = function (item) {
            $ctrl.focusedIndex = $ctrl.grItemsFiltered.length ? 0 : null;
            $ctrl.ngModel.push($ctrl.grItemsValue ? item[$ctrl.grItemsValue] : item);
            $ctrl.ngModelCtrl.$modelValue = $ctrl.ngModel;
            $ctrl.changeFunction && $ctrl.changeFunction(item);
            $element.find('input').focus();
            $ctrl.searchQuery = '';
            $ctrl.ngModelCtrl.$setDirty();
            $ctrl.ngModelCtrl.$setValidity('min', isMinValid($ctrl.ngModel));
            $ctrl.ngModelCtrl.$setValidity('max', isMaxValid($ctrl.ngModel));
        };
        $ctrl.removeChip = function (index) {
            if ($ctrl.ngModel.constructor !== Array)
                return;
            $ctrl.ngModel.splice(index, 1);
            $ctrl.changeFunction && $ctrl.changeFunction();
            $ctrl.ngModelCtrl.$setDirty();
            $ctrl.ngModelCtrl.$setValidity('min', isMinValid($ctrl.ngModel));
            $ctrl.ngModelCtrl.$setValidity('max', isMaxValid($ctrl.ngModel));
        };
    }
})();
