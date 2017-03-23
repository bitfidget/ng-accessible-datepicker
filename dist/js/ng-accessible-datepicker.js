// ng-accessible-datepicker.js

var app = angular.module('app', []);

app.controller('mehController', function ($scope) {
  $scope.minDate = new Date('2017/02/03');
  $scope.maxDate = new Date('2019/04/20');
});

app.directive('datePicker', function () {
    return {
        scope: {
          format: '@',
          initDate: '@',
          min: '=',
          max: '=',
          range: '=',
          rangeShown: '='
        },
        restrict: 'AE',
        replace: 'true',
        templateUrl: '/src/partials/ng-accessible-datepicker.html',
        link: function (scope, elem, attrs) {

          // some initial variables
          var today = scope.initDate || new Date();
          var refDate = angular.copy(today);
          var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

          // all the heavy data will kept in here
          scope.displayedCalendars = [];

          // toggle open/close on datepicker
          scope.togglePicker = function () {
            scope.open = !scope.open;
          };

          // handle select/deselect - keeping here incase we build more into it
          scope.handleClick = function (d) {
            scope.selectedDate = d.date;
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
          var isOutside = function (d) {
            return (d.getMonth() !== refDate.getMonth());
          };

          // check if date is between min and max dates
          var isDisabled = function (d) {
            return (d < scope.min || d > scope.max);
          };

          var buildCalendar = function () {

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
                    outside: isOutside(date),
                    today: isToday(date),
                    disabled: isDisabled(date)
                  };
                  week.push(angular.copy(dayToAdd));
                  date.setDate(date.getDate() + 1);
                  wd++;
                }
                currentMonthView.push(week);
                mw++;
              };
              scope.displayedCalendars.push(currentMonthView);
              cm++;
            };
            debugger
          };

          buildCalendar();



          // var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];




          // open/close datepicker when button is clicked
          // elem.find('button').bind('click', function () {
          //   scope.$apply(function () {
          //     scope.togglePicker();
          //   });
          // });

        }
    };
});
