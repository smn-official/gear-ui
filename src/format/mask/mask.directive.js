// (function () {
//     'use strict';
//
//     angular
//         .module('gear')
//         .directive('grMask', grMask);
//
//     function grMask() {
//         var directive = {
//             restrict: 'A',
//             link: link,
//             require: 'ngModel',
//             scope: {
//                 grMask: '@'
//             }
//         };
//         return directive;
//
//         function link(scope, element, attrs, ctrl) {
//             var mask = '000.000.000-00',
//                 globalSettings = {
//                     translation: {
//                         '0': /\d/
//                     }
//                 };
//
//             function possibleToTranslateBack(char) {
//                 for (var prop in globalSettings.translation) {
//                     if (globalSettings.translation[prop].test(char))
//                         return true;
//                 }
//                 return false;
//             }
//
//             function getPattern(type) {
//                 return globalSettings.translation[type];
//             }
//
//             function testPattern(pattern, value) {
//                 return pattern && pattern.test(value);
//             }
//
//             function formatMask(value) {
//                 var splittedMask = mask.split('');
//                 var splittedValue = typeof value !== 'object' ? value.toString().split('') : '';
//                 var newValue = [];
//                 var valueOffset = 0;
//
//                 for (var i = 0; i < splittedMask.length; i++) {
//                     var valueChar = splittedValue[i + valueOffset];
//                     console.log('dasdsa: ', valueChar)
//                     if (typeof valueChar === 'undefined')
//                         break;
//                     var maskChar = splittedMask[i];
//                     var pattern = getPattern(maskChar);
//                     if (testPattern(pattern, valueChar))
//                         newValue.push(valueChar);
//                     else {
//                         // var nextMaskChar = splittedMask[i];
//                         // var nextTranslationChar = globalSettings.translation[nextMaskChar];
//                         // if (!possibleToTranslateBack(valueChar))
//                             newValue.push(maskChar);
//                     }
//                     console.log(possibleToTranslateBack(valueChar))
//                     // var valueChar = splittedValue[i];
//                     // if (typeof valueChar === 'undefined')
//                     //     break;
//                     // var maskChar = splittedMask[i + offset];
//                     // var translationChar = globalSettings.translation[maskChar];
//                     // if (translationChar && translationChar.test(valueChar))
//                     //     newValue += valueChar;
//                     // else {
//                     //     var nextMaskChar = splittedMask[i + offset + 1];
//                     //     var nextTranslationChar = globalSettings.translation[nextMaskChar];
//                     //     if (nextTranslationChar && nextTranslationChar.test(valueChar)) {
//                     //         newValue += valueChar;
//                     //         offset++;
//                     //     } else
//                     //         newValue += maskChar;
//                     // }
//                 }
//                 newValue = newValue.join('');
//
//                 return newValue;
//             }
//
//             ctrl.$parsers.push(function (value) {
//                 console.log(value)
//                 var viewValue = formatMask(value);
//                 ctrl.$setViewValue(viewValue);
//                 ctrl.$render();
//                 return viewValue;
//             });
//
//             ctrl.$formatters.push(function (value) {
//                 ctrl.$modelValue = formatMask(value);;
//                 return formatMask(value);
//             });
//         }
//     }
//
// })();
//
