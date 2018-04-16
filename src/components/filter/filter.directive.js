(function () {
    'use strict';

    angular
        .module('smn-ui')
        .directive('uiFilter', uiFilter);

    uiFilter.$inject = ['$timeout', '$filter'];
    function uiFilter($timeout, $filter) {
        var directive = {
            link: link,
            restrict: 'AE',
            transclude: true,
            scope: {
                'labelFilter': '@',
                'ngModel': '=',
                'modelSearch': '@',
                'modelId': '@',
                'list': '=',
                'itemName': '@',
                'requiredFilter': '='
            },
            require: 'ngModel',
            templateUrl: 'components/filter/filter.directive.html' 
    };
    return directive;

    function link(scope, element, attrs, ngModelController) {
            activate();

            function activate() {
                scope.filter = filter;
                scope.select = select;

                document.getElementById('inputFilter').onfocus = onFocus;
                window.onclick = onBlur;
            }

            function close(obj) {
                document.getElementById('listFilter').classList.remove('ui-list-filter-open');
                $timeout(function () {
                    var different = true;
                    scope.list.forEach(function (obj) {
                        if (scope.ngModelFilter == obj[scope.itemName]) {
                            different = false;
                        }
                    })

                    if (different && scope.ngModelFilter) {
                        scope.ngModelFilter = '';
                        if (scope.requiredFilter !== undefined && scope.requiredFilter) {
                            scope.formFilter.$setValidity('differentItem', false);
                        }
                    } else {
                        scope.formFilter.$setValidity('differentItem', true);
                    }
                    if (!scope.ngModelFilter) {
                        scope.ngModel = null;
                    }
                }, 50);


            }

            function filter() {
                var obj = {};
                obj[scope.modelSearch] = scope.ngModelFilter;
                return obj;
            }

            function select(obj) {
                scope.ngModel = obj[scope.modelId] || obj;
                scope.ngModelFilter = obj[scope.itemName];
                close();
            }

            function onFocus() {
                document.getElementById('listFilter').classList.add('ui-list-filter-open');
            }

            function onBlur(e) {
                if ((document.getElementById('listFilter') && document.getElementById('inputFilter')) && e.target != document.getElementById('listFilter') && e.target != document.getElementById('inputFilter')) {
                    scope.$apply(function () {
                        close();
                    })
                }
            }


        }

    };
})();