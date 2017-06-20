var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

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

  $scope.addToTop = function(task, ident) {
    var holder = task//working!
    holder._id = task.id//working!
    $http.delete("/taskmanager/" + ident)//working!
    $http.post("/taskmanager", holder)//working!
    refresh()//working!
  }

  $scope.deleteTask = function(id) {
    $http.delete("/taskmanager/" + id).then(function(success){
      refresh();
    }, function(error) {
      console.log('delete error');
    });
  };

}]);