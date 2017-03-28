// app.js

var app = angular.module('app', []);

app.controller('mehController', function ($scope) {

  // set some test date data
  $scope.initDate;
  $scope.minDate = new Date('2017/02/03');
  $scope.maxDate = new Date('2019/04/20');
  $scope.range = false;
  $scope.rangeShown = 1;

  $scope.toggleRange = function (state) {
    $scope.range = state;
    console.log('range = ' + $scope.range);
  };

});