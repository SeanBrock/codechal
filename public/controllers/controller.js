var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  console.log('inside controller!')

    var refresh = function() {
    $http.get("/taskmanager").then(function (success) {
        $scope.taskmanager = success.data;
        $scope.task = {};
      },function (error){

    });
  }
  $scope.refresh = function(){refresh();}
  refresh();

}]);