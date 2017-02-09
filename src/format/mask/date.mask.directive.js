(function () {
    'use strict';

    angular
        .module('ui')
        .directive('grMaskDate', grMaskDate);

    function grMaskDate($filter, $timeout) {
        var directive = {
            restrict: 'A',
            link: link,
            require: 'ngModel',
            scope: {
                grMaxDate: '='
            }
        };
        return directive;

        function link(scope, element, attrs, ctrl) {
            var beforeSelIndex, afterSelIndex, futureSelIndex;

            element.on('keydown', function () {
                beforeSelIndex = doGetCaretPosition(element[0]);
            });

            ctrl.$parsers.push(function (value) {
                afterSelIndex = doGetCaretPosition(element[0]);

                var viewValue = formatDate(ctrl.$viewValue);
                var check = checkDate(viewValue);

                ctrl.$setViewValue(viewValue);
                ctrl.$render();

                if (element[0].selectionStart || element[0].selectionStart == '0') {
                    switch (true) {
                        case beforeSelIndex == 2 && afterSelIndex == 3:
                            futureSelIndex = 4;
                            break;
                        case beforeSelIndex == 5 && afterSelIndex == 6:
                            futureSelIndex = 7;
                            break;
                        default:
                            futureSelIndex = afterSelIndex;
                    }
                    setCaretPosition(element[0], futureSelIndex);
                    $timeout(function () {
                        setCaretPosition(element[0], futureSelIndex);
                    });
                }

                if (viewValue.length === 10 && check && (!scope.grMaxDate || scope.grMaxDate >= check)) {
                    var dateArray = viewValue.split('/');
                    return new Date(dateArray[2], dateArray[1]-1, dateArray[0]);
                }
                if (!viewValue)
                    return '';
            });

            ctrl.$formatters.push(function (value) {
                return $filter('date')(value, 'dd/MM/yyyy');
            });

            function formatDate(date) {
                if (!date) return '';
                date = date.replace(/[^0-9]+/g, '');
                if (date.length > 2)
                    date = date.substring(0,2) + '/' + date.substring(2);
                if (date.length > 5)
                    date = date.substring(0,5) + '/' + date.substring(5,9);
                return date;
            }

            function checkDate(value) {
                if (!/^[\d, \/]+$/.test(value))
                    return false;
                var splittedDate = value.split('/');
                if (splittedDate.length !== 3)
                    return false;

                var date = splittedDate[0],
                    month = splittedDate[1],
                    year = splittedDate[2];
                if (!date || !month || !year || month < 1 || month > 12) {
                    return false;
                }
                var dateCheck = new Date(year, month, 0).getDate();
                if (date > dateCheck || date < 1) {
                    return false;
                }
                var validDate = new Date(year, month - 1, date);
                return validDate;
            }

            function doGetCaretPosition(elem) {
                var caretPos = 0;
                // IE Support
                if (document.selection) {
                    elem.focus();
                    var sel = document.selection.createRange();
                    sel.moveStart('character', -elem.value.length);
                    caretPos = sel.text.length;
                }
                // Firefox support
                else if (elem.selectionStart || elem.selectionStart == '0') {
                    caretPos = elem.selectionStart;
                }

                return caretPos;

            }

            function setCaretPosition(elem, caretPos) {
                if (elem != null) {
                    if (elem.createTextRange) {
                        var range = elem.createTextRange();
                        range.move('character', caretPos);
                        range.select();
                    }
                    else {
                        if (elem.selectionStart) {
                            elem.focus();
                            elem.setSelectionRange(caretPos, caretPos);
                        }
                        else {
                            elem.focus();
                        }
                    }
                }
            }
        }
    }

})();