(function () {
	'use strict';

	angular.module('smn-ui')
		.directive('uiDatalist', ["$timeout", "$filter", function ($timeout, $filter) {
			return {
				restrict: 'AE',
				transclude: true,
				require: '?ngModel',
				scope: {
					'list': '=',
					'idList': '@',
					'placeholderList': '@',
					'config': '&',
					'attrList': '@',
					'itemDefault': '@',
					'labelList': '@',
					'change': '=',
					'click': '='
				},
				templateUrl:'components/datalist/datalist.directive.html' ,
				link: function (scope, element, attrs, ngModel) {
					scope.config = angular.extend(scope.config || {}, {
						display: null,
						option: 'nome',
						value: 'id'
					});

					scope.$watch('list', function () {
						if (scope.list && scope.itemDefault)
							scope.list.splice(0, 0, typeof scope.list[0] == 'object' ? { [scope.config.option]: scope.itemDefault, [scope.config.value]: null } : scope.itemDefault);
					});

					scope.selected = function () {
						var itemSelected = scope.list.filter(function (obj) {
							return obj.nome == scope.choosen;
						})[0];
						var rtn = !scope.attrList ? itemSelected || null : itemSelected ? itemSelected[scope.attrList] : null;
						ngModel.$setViewValue(rtn);
						scope.change && scope.change(rtn);
					}
				}
			};
		}]);
})();