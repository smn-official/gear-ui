(function () {
    'use strict';

    angular
        .module('ui')
        .directive('grInputFile', grInputFile);

    grInputFile.$inject = ['$compile'];

    function grInputFile($compile) {
        var directive = {
            require: 'ngModel',
            restrict: 'A',
            link: link,
            scope: {
                'ngModel': '=',
                'accept': '@?',
                'grFileChange': '&',
                'grMaxSize': '@?',
                'grMaxFileSize': '@?',
                'grValidExt': '@?',
                'grRead': '&?',
                'grReadDataUrl': '=?'
            }
        };
        return directive;

        function link(scope, element, attrs, ctrl) {
            ctrl.$formatters.push(function (value) {
                if (!value) {
                    element.val('').trigger('change');
                    ctrl.$setValidity('grMaxSize', true);
                    ctrl.$setValidity('grMaxFileSize', true);
                    ctrl.$setValidity('grAccept', true);
                }
            });
            ctrl.$parsers.push(function (value) {
                if (!value)
                    element.val('').trigger('change');
            });

            element[0].addEventListener('change', handleFileSelect, false)
            function handleFileSelect(e) {
                e.stopPropagation();
                e.preventDefault();

                var files = e.target.files;
                scope.$apply(function () {
                    scope.grReadDataUrl = 'grReadDataUrl' in attrs && files.length ? [] : null;
                    ctrl.$setDirty();
                    ctrl.$setValidity('grMaxSize', true);
                    ctrl.$setValidity('grMaxFileSize', true);
                    ctrl.$setValidity('grAccept', true);

                    // Verificação de tamanho
                    var maxSize = scope.grMaxSize ? toByte(scope.grMaxSize) : null,
                        maxFileSize = scope.grMaxFileSize ? toByte(scope.grMaxFileSize) : null,
                        accepts = scope.accept.split(',');
                    var sum = 0;
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i],
                            fileSize = file.size,
                            fileType = file.type;
                        if (maxFileSize && fileSize > maxFileSize)
                            ctrl.$setValidity('grMaxFileSize', false);
                        sum += fileSize;

                        // Verificar MIME Types
                        var validType = false;
                        for (var j = 0; j < accepts.length; j++) {
                            var accept = accepts[j].trim();
                            // Checa se tem apenas um asterisco
                            // e se ele está no final
                            var regex = accept.match(/^[^\*]*\*$/) ? new RegExp('^' + accept) : new RegExp('^' + accept + '$');
                            if (fileType.match(regex)) {
                                validType = true;
                                break;
                            }
                        }
                        if (!validType)
                            ctrl.$setValidity('grAccept', false);

                        if (maxSize && sum > maxSize)
                            ctrl.$setValidity('grMaxSize', false);

                        if (ctrl.$valid && scope.grReadDataUrl) {
                            scope.grReadDataUrl.push({});
                            readFile(file, scope.grReadDataUrl[i], i);
                        }
                    }

                    scope.ngModel = e.target.files;

                    scope.grFileChange({ '$files': scope.ngModel, '$error': ctrl.$invalid ? ctrl.$error : null });
                });
            }
            
            function toByte(sizeString) {
                sizeString = sizeString.toString();
                var unitMatch = sizeString.match(/[a-zA-Z]+/g),
                    unit = unitMatch ? unitMatch[0] : null,
                    sizeMatch = sizeString.match(/\d+/),
                    unitSize = sizeMatch ? parseInt(sizeMatch[0]) : null,
                    size = unitSize;
                switch (unit) {
                    case 'KB':
                        size = unitSize * 1024;
                        break;
                    case 'MB':
                        size = unitSize * Math.pow(1024, 2);
                        break;
                    case 'GB':
                        size = unitSize * Math.pow(1024, 3);
                        break;
                    case 'TB':
                        size = unitSize * Math.pow(1024, 4);
                        break;
                    case 'PB':
                        size = unitSize * Math.pow(1024, 5);
                        break;
                    case 'EB':
                        size = unitSize * Math.pow(1024, 6);
                        break;
                    case 'ZB':
                        size = unitSize * Math.pow(1024, 7);
                        break;
                    case 'YB':
                        size = unitSize * Math.pow(1024, 8);
                        break;
                }
                return size;
            }

            function readFile(file, data, index) {
                var reader = new FileReader();
                data.resolved = 'false';
                reader.onload = function (e) {
                    scope.$apply(function () {
                        data.result = e.target.result;
                        data.resolved = true;
                        scope.grRead && scope.grRead({ $data: data.result, $index: index })
                    });
                };
                reader.onerror = function (e) {
                    scope.$apply(function () {
                        data.error = e.target.error;
                    });
                };
                reader.onprogress = function (e) {
                    if (!e.lengthComputable)
                        return;
                    scope.$apply(function () {
                        data.progress = {
                            loaded: e.loaded,
                            total: e.total,
                            percent: Math.round((e.loaded/e.total) * 100)
                        }
                    });
                };
                reader.readAsDataURL(file);
            }
        }
    }

})();

