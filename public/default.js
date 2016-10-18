const myApp = angular.module('myApp', []);

myApp.controller('HomeController', ['$scope', function($scope) {
  $scope.message= 'Hello World';
}]);
