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

  $scope.imageClick = function(url) {
    window.location = url;
  }

  $scope.addTask = function() {
    if (this.task.date === undefined) {
    var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var date = new Date();
    var y = date.getFullYear();
    var d = date.getUTCDate();
    var m = monthShortNames[date.getUTCMonth()];
    this.task.date = d + ' ' + m + ' ' + y;
    }
    if (this.task.email === undefined) {
      this.task.email = 'Not On File'
    }
    if (this.task.cell === undefined) {
      this.task.cell = 'Not On File'
    }
    // this.task.state = 'In Progress'
    $http.post("/taskmanager", this.task).then(function (success) {
      refresh();
      $scope.task = {}
    }, function (error) {
      console.log('post error')
    });

  }
  //will be usefull eventually
  $scope.deleteTask = function(id) {
    $http.delete("/taskmanager/" + id).then(function(success){
      refresh();
    }, function(error) {
      console.log('delete error');
    });
  };

  $scope.updateTask = function(id) {
    $http.post("/taskmanager/", this.task).then(function(success){

    $http.delete("/taskmanager/" + id).then(function(success){
      refresh();
      $scope.task = {}
    }, function(error) {
      console.log('delete error');
    });
    }, function(error) {
      console.log('update post error');
    });
  };



//collection.findAndModify(criteria[, sort[, update[, options]]], callback)
  //  $scope.updateTask = function(id, status) {
  //   console.log(id)
  //   console.log(status)
  //   // $http.delete("/taskmanager/" + id).then(function(success){
  //   //   refresh();
  //   // }, function(error) {
  //   //   console.log('delete error');
  //   // });
  // };

}]);