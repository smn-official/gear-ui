(function () {
    'use strict';

    angular
        .module('smn-ui')
        .directive('uiMaskCnpj', uiMaskCnpj);

    function uiMaskCnpj(uiCnpjFilter, $timeout) {
        var directive = {
            restrict: 'A',
            link: link,
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ctrl) {
            var beforeSelIndex, afterSelIndex, futureSelIndex;

            element.on('keydown', function () {
                beforeSelIndex = doGetCaretPosition(element[0]);
            });

            ctrl.$parsers.push(function(value){
                afterSelIndex = doGetCaretPosition(element[0]);

                var viewValue = uiCnpjFilter(value);
                ctrl.$setViewValue(viewValue);
                ctrl.$render();

                if (element[0].selectionStart || element[0].selectionStart == '0') {
                    switch (true) {
                        case beforeSelIndex == 2 && afterSelIndex == 3:
                            futureSelIndex = 4;
                            break;
                        case beforeSelIndex == 6 && afterSelIndex == 7:
                            futureSelIndex = 8;
                            break;
                        case beforeSelIndex == 10 && afterSelIndex == 11:
                            futureSelIndex = 12;
                            break;
                        case beforeSelIndex == 15 && afterSelIndex == 16:
                            futureSelIndex = 17;
                            break;
                        default:
                            futureSelIndex = afterSelIndex;
                    }
                    setCaretPosition(element[0], futureSelIndex);
                    $timeout(function () {
                        setCaretPosition(element[0], futureSelIndex);
                    });
                }

                if (viewValue.length === 18)
                    return viewValue.replace(/[^0-9]+/g, '');
                if (!viewValue)
                    return '';
            });

            ctrl.$formatters.push(function(value) {
                value = typeof value == 'number' ? value.toString() : value;
                if (value) value = ("00000000000000" + value).substring((14 + value.length) - 14);
                return uiCnpjFilter(value);
            });

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