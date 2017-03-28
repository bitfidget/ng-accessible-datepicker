// ng-accessible-datepicker.js

// TODO:
// add end date for range
// handle clicking again on start date
// indicate the direction of the start date (mark the intended range)


app.directive('datePicker', function () {
    return {
        scope: {
          format: '@',
          initDate: '=',
          min: '=',
          max: '=',
          range: '=',
          rangeShown: '='
        },
        restrict: 'AE',
        replace: 'true',
        templateUrl: '/src/partials/ng-accessible-datepicker.html',
        link: function (scope, elem, attrs) {

          scope.$watch('[initDate, min, max, rangeShown, range]', function () {
            buildCalendar();
            console.log('local range = ' + scope.initDate)
          });

          // some initial variables
          var today = new Date();
          var refDate = angular.copy(today);

          // toggle open/close on datepicker
          scope.togglePicker = function () {
            scope.open = !scope.open;
          };

          // handle select/deselect - keeping here incase we build more into it
          scope.handleClick = function (d) {
            // if date is already the selected date, unselect
            if (scope.startDate === d.date) {
              scope.startDate = null;
            } else {
              // if range of dates is required
              if (scope.range === true) {
                if (!scope.startDate || d.date < scope.startDate) {
                  scope.startDate = d.date;
                  scope.endDate = null;
                } else {
                  scope.endDate = d.date;
                }
              } else {
                scope.startDate = d.date;
              }
            }
          };

          // show the month name for the current calendar
          scope.displayMonthName = function (i) {
            return (new Date(refDate.getYear(), refDate.getMonth() + i, 1));
          };

          scope.prevMonthValid = function () {
            // if refDate year month start > minDate year month end
            return (new Date(refDate.getYear(), refDate.getMonth(), 1) > new Date(scope.min.getYear(), scope.min.getMonth() + 1, 0));
          };

          scope.prevMonth = function () {
            refDate.setMonth(refDate.getMonth() - 1);
            buildCalendar();
          };

          scope.nextMonthValid = function () {
            // if refDate year month end < maxDate year month start
            return (new Date(refDate.getYear(), refDate.getMonth() + 1, 0) < new Date(scope.max.getYear(), scope.max.getMonth(), 1));
          };

          scope.nextMonth = function () {
            refDate.setMonth(refDate.getMonth() + 1);
            buildCalendar();
          };

          scope.prevYearValid = function () {
            // if refDate year start > maxDate year end
            return (new Date(refDate.getYear(), 0, 1) > new Date(scope.min.getYear() + 1, 0, 0));
          };

          scope.prevYear = function () {
            refDate.setYear(refDate.getFullYear() - 1);
            buildCalendar();
          };

          scope.nextYearValid = function () {
            // if refDate year end < maxDate year start
            return (new Date(refDate.getYear() + 1, 0, 0) < new Date(scope.max.getYear(), 0, 1));
          };

          scope.nextYear = function () {
            refDate.setYear(refDate.getFullYear() + 1);
            buildCalendar();
          };

          // to evaluate date against current date
          var isToday = function (d) {
            return (d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear())
          };

          // evaluate if date is inside current month
          var isOutside = function (d, i) {
            return (d.getMonth() !== refDate.getMonth() + i);
          };

          // check if date is between min and max dates
          var isDisabled = function (d) {
            return (d < scope.min || d > scope.max);
          };

          var buildCalendar = function () {

            // catch the initDate variable if exists
            today = scope.initDate || today;

            // all the heavy data will kept in here
            scope.displayedCalendars = [];
            scope.startDate = null;

            var cm = 0;
            scope.refDate = refDate;

            while (cm < scope.rangeShown) {
              // now do this x times to match rangeShown

              var date = new Date(refDate.getFullYear(), refDate.getMonth() + cm, 1, 0, 0, 0, 0);
              var extras = (date.getDay() + 7) % 7; // How many days of the last month do we need to include?
              date.setDate(date.getDate() - extras); // Skip back to the previous sunday

              var mw = 0;
              var currentMonthView = [];

              while (mw < 6) {
                var wd = 0;
                var week = [];
                while (wd < 7) {
                  var dayToAdd = {
                    date: date,
                    outside: isOutside(date, cm),
                    today: isToday(date),
                    disabled: isDisabled(date)
                  };
                  week.push(angular.copy(dayToAdd));
                  date.setDate(date.getDate() + 1);
                  wd++;
                }
                currentMonthView.push(week);
                mw++;
              }
              scope.displayedCalendars.push(currentMonthView);
              cm++;
            }
          };

          buildCalendar();
        }
    };
});
