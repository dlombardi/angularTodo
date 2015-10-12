"use strict";

var app = angular.module('sample', ['ui.router']);

app.config(function($urlRouterProvider, $stateProvider){
  $stateProvider
    .state('home', { url: '/', templateUrl: '/templates/home.html', controller: 'home'})
    .state('todo', { url: '/todo', templateUrl: '/templates/todo.html', controller: 'todo'})
  $urlRouterProvider.otherwise('/');
})

app.controller("home", function($scope){
  $scope.number = 0;
  $scope.count = function(){
    $scope.number++;
  }
  console.log("working");
});

app.controller("todo", function($scope, $http){
  $scope.tasks = [];

  var getTasks = function(){
    $http.get("http://localhost:3000/todo")
    .success(function(tasks){
      $scope.tasks = tasks;
    });
  }

  getTasks();

  $scope.submit = function(task){
    console.log(task);
    $http.post("/todo/add", task)
    .success(function(task){
      console.log(task);
      getTasks();
    });
  }

  $scope.changeStatus = function(task){
    $http.put("/todo/update", task)
    .success(function(task){
      $scope.tasks.forEach(function(shownTask, i ){
        if(shownTask._id === task._id){
          $scope.tasks.splice(i, 1, task);
          
          console.log($scope.tasks);
        }
      })
    });
  }

  $scope.deleteTask = function(task){
    console.log('task:', task);
    $http.delete("/todo/" + task._id)
    .success(function(task){
      console.log(task);
      $scope.tasks.forEach(function(shownTask, i){
        if(shownTask._id === task._id){
          $scope.tasks.splice(i, 1);
          getTasks();
        }
      })
    })
  }
});
