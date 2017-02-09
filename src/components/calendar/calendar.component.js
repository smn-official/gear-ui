(function() {
    'use strict';

    angular
        .module('ui')
        .component('grCalendar', {
            controller: grCalendarController,
            templateUrl: 'app/ui/components/calendar/calendar.component.tpl.html',
            require: 'ngModel',
            bindings: {
                ngModel: '=?',
                grViewDate: '=?',
                grMinDate: '=?',
                grMaxDate: '=?',
                grFilterDate: '@?',
                grSelect: '&?',
                grCancel: '&?',
                grShowOtherMonth: '=?',
                grConfirmSelection: '=?'
            }
        });

    grCalendarController.$inject = ['$element', '$templateCache', '$compile', '$animate', '$scope', '$timeout', '$locale', '$attrs', '$animateCss'];
    function grCalendarController($element, $templateCache, $compile, $animate, $scope, $timeout, $locale, $attrs, $animateCss) {
        var $ctrl = this;
        var days = $locale.DATETIME_FORMATS.DAY,
            shortDays = $locale.DATETIME_FORMATS.SHORTDAY,
            months = $locale.DATETIME_FORMATS.MONTH,
            shortMonths = $locale.DATETIME_FORMATS.SHORTMONTH;

        $ctrl.$onInit = function () {
            $ctrl.ngModel = $ctrl.ngModel ? new Date($ctrl.ngModel) : $ctrl.ngModel;

            $ctrl.choosenDate = $ctrl.ngModel;
            $ctrl.grShowOtherMonth = typeof $ctrl.grShowOtherMonth === 'undefined' ? 'grShowOtherMonth' in $attrs : $ctrl.grShowOtherMonth;
            $ctrl.grConfirmSelection = typeof $ctrl.grConfirmSelection === 'undefined' ? 'grConfirmSelection' in $attrs : $ctrl.grConfirmSelection;

            $ctrl.days = days;
            $ctrl.shortDays = shortDays;
            $ctrl.months = months;
            $ctrl.shortMonths = shortMonths;

            $ctrl.grViewDate = ('grInitOnSelected' in $attrs ? null : angular.copy($ctrl.grViewDate)) || angular.copy($ctrl.ngModel) || new Date();
            $ctrl.grViewDate = new Date($ctrl.grViewDate);
            $ctrl.grViewDate = $ctrl.grViewDate.constructor !== Date|| isNaN($ctrl.grViewDate.getTime()) ? new Date() : $ctrl.grViewDate;

            renderCalendar($ctrl.grViewDate);
        };


        $ctrl.isDay = isDay;

        $ctrl.prevMonth = function () {
            renderCalendar(getMonthSequence($ctrl.grViewDate, -1), true)
        }

        $ctrl.nextMonth = function () {
            renderCalendar(getMonthSequence($ctrl.grViewDate))
        }

        $ctrl.showOtherMonth = function (dayMonth, calendarMonth) {
            return dayMonth === calendarMonth || $ctrl.grShowOtherMonth;
        }

        $ctrl.chooseDate = chooseDate;
        $ctrl.selectDate = selectDate;
        $ctrl.cancel = cancel;
        $ctrl.isDisabled = isDisabled;

        var enterAnimationPromise;
        function renderCalendar(dateTarget, prev) {
            var date = angular.copy(dateTarget);

            date.setHours(0,0,0,0);
            // É setado o dia 1 para não pular mês caso o mês atual tenha 31 dias
            // e o próximo tenha apenas 30 ou menos.
            date.setDate(1);
            date.setMonth(date.getMonth() + 1);
            date.setDate(0);

            $ctrl.grViewDate = date;

            var info = {
                year: date.getFullYear(),
                month: date.getMonth(),
                monthDays: date.getDate(),
                lastDayWeek: date.getDay(),
                lastDayWeekName: days[date.getDay()]
            };
            date.setDate(1);

            info.firstDayWeek = date.getDay();
            info.firstDayWeekName = days[date.getDay()];
            info.totalDays = info.monthDays + info.firstDayWeek + (6 - info.lastDayWeek);
            info.days = [];

            var firstDate = -info.firstDayWeek + 1,
                lastDate = info.monthDays + (7 - info.lastDayWeek);

            for (var i = firstDate; i < lastDate; i++) {
                var date = new Date(info.year, info.month, i),
                    today = new Date();
                if (date.getFullYear() === today.getFullYear() &&
                    date.getMonth() === today.getMonth() &&
                    date.getDate() === today.getDate())
                    today = true;
                else
                    today = false;
                info.days.push({
                    month: date.getMonth(),
                    date: date.getDate(),
                    value: date,
                    time: date.getTime(),
                    today: today
                });
            }
            enterAnimationPromise && $animate.cancel(enterAnimationPromise);
            $animate.leave($element.find('.calendar'), {
                addClass: prev ? 'leave-right' : 'leave-left'
            });

            var calendar = $compile($templateCache.get('app/ui/components/calendar/mini-calendar.tpl.html'))($scope);
            enterAnimationPromise = $animate.enter(calendar, $element.find('.calendar-cover'), null, {
                addClass: prev ? 'enter-left' : 'enter-right'
            });
            var calendarCover = $element.find('.calendar-cover');
            if ($element.find('.calendar').length > 1) {
                $timeout(function () {
                    var firstCalendar = $element.find('.calendar:first');
                    calendarCover.css('height', firstCalendar.height());
                });
            }
            $ctrl.calendar = info;
        }

        function getMonthSequence(date, num) {
            var prevMonth = angular.copy(date);
            prevMonth.setDate(1);
            prevMonth.setMonth(prevMonth.getMonth() + (num || 1));
            return prevMonth;
        }

        function isDay(value) {
            if (!$ctrl.choosenDate)
                return;
            var dateToCheck = angular.copy($ctrl.choosenDate);
            return (
                dateToCheck.getDate() === value.getDate() &&
                dateToCheck.getMonth() === value.getMonth() &&
                dateToCheck.getFullYear() === value.getFullYear()
            );
        };

        function chooseDate(value) {
            value = angular.copy(value);
            if (value)
                $ctrl.choosenDate = value;
            if (!$ctrl.grConfirmSelection)
                selectDate(value);
        };

        function selectDate(value) {
            $ctrl.ngModel = value;
            $ctrl.grSelect && $ctrl.grSelect({ '$date': value });
        }

        function cancel() {
            $ctrl.grCancel && $ctrl.grCancel();
        }

        function isDisabled(value) {
            var minDate = $ctrl.grMinDate ? new Date($ctrl.grMinDate).getTime() : null,
                maxDate = $ctrl.grMaxDate ? new Date($ctrl.grMaxDate).getTime() : null,
                date = value.getTime();
            if (typeof minDate === 'number' && !isNaN(minDate) && date < minDate)
                return true;
            if (typeof maxDate === 'number' && !isNaN(maxDate) && date > maxDate)
                return true;
            return false;
        }

        $element.on('keydown', '.month-label', function (e) {
            $timeout(function () {
                switch (e.keyCode) {
                    // Seta para esquerda
                    case 37:
                        $ctrl.prevMonth();
                        break;
                    // Seta para direita
                    case 39:
                        $ctrl.nextMonth();
                        break;
                    // Seta para baixo
                    case 40:
                        $element.find('.days button:first').focus();
                        break;
                }
            });
        });

        $element.on('keydown', '.days button', function (e) {
            var target = angular.element(e.target).closest('.day');
            function getSibling(index) {
                return $element.find('.calendar .day').eq(index).children('button:not([disabled])');
            }
            $timeout(function () {
                switch (e.keyCode) {
                    // Seta para esquerda
                    case 37:
                        var toFocus = getSibling(target.index() - 1);
                        if (!toFocus.length)
                            $element.find('.days button:not([disabled]):last').focus();
                        else
                            toFocus.focus();
                        break;
                    // Seta para cima
                    case 38:
                        var toFocus = getSibling(target.index() - 7);
                        var toFocusAlt = $element.find('.days button:not([disabled]):first');

                        if (toFocus.length && target.index() > toFocus.parent().index())
                            toFocus.focus();
                        else if (target.index() > toFocusAlt.parent().index())
                            toFocusAlt.focus();
                        else
                            $element.find('.month-label').focus();
                        break;
                    // Seta para direita
                    case 39:
                        var toFocus = getSibling(target.index() + 1);
                        if (!toFocus.length)
                            $element.find('.days button:not([disabled]):first').focus();
                        else
                            toFocus.focus();
                        break;
                    // Seta para baixo
                    case 40:
                        var toFocus = getSibling(target.index() + 7);
                        var toFocusAlt = $element.find('.days button:not([disabled]):last');

                        if (toFocus.length && target.index() < toFocus.parent().index())
                            toFocus.focus();
                        else if (target.index() < toFocusAlt.parent().index())
                            toFocusAlt.focus();
                        else
                            $element.find('.month-label').focus();
                        break;
                }
            });
        });

        $element.on('keydown', function (e) {
            if ([37,38,39,40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
                return false;
            }
        })
    }

})();