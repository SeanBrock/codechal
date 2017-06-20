var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  console.log('inside controller!')

  var refresh = function() {
    $http.get("/taskmanager").then(function (success) {
      $scope.taskmanager = success.data;
      $scope.task = {};
    },function (error){
      console.log('refresh/get error')
    });
  }
  $scope.refresh = function(){refresh();}
  refresh();

  $scope.addTask = function() {
    $http.post("/taskmanager", $scope.task).then(function (success) {
      refresh();
    }, function (error) {
      console.log('post error')
    });
  }

  $scope.deleteTask = function(id) {
    $http.delete("/taskmanager/" + id).then(function(success){
      console.log('trying to delete?')
      refresh();
    }, function(error) {
      console.log('delete error');
    });
  };

}]);