// (function () {
//     'use strict';
//
//     angular
//         .module('ui')
//         .factory('grFileSelect', grFileSelect);
//
//     grFileSelect.$inject = ['$compile', '$rootScope'];
//
//     function grFileSelect($compile, $rootScope) {
//         return service;
//
//         ////////////////
//
//         function service(params) {
//             var defaults = {
//                 model: null,
//                 onSelect: function () {
//
//                 },
//                 maxSize: null,
//                 readDataUrl: null,
//                 onRead: function ($data) {
//
//                 },
//                 accept: null
//             };
//             var config = angular.extend({}, defaults, params);
//             console.debug(config)
//             $compile('<input type="file"' +
//                 'class="gr-input-file-hidden"' +
//                 'ng-model="vm.uploadImagemUsuario"' +
//                 'gr-file-select="vm.fileSelect($files)"' +
//                 'gr-max-size="2MB"' +
//                 'gr-read-data-url="vm.uploadImagemUsuario.data"' +
//                 'gr-read="vm.info.imagemUsuario = $data"' +
//                 'gr-service-invoked' +
//                 'accept="image/jpeg, image/png">')(config.scope);
//         }
//     }
//
// })();
//
