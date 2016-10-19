/* global angular */

const myApp = angular.module('myApp', []);

myApp.controller('HomeController', homeController);

function homeController() {
  const vm = this;
  vm.message = 'Hello World';

  vm.todos = [
    {text:'Learn AngularJS', completed: true},
    {text:'Build an App', completed: false},
    {text:'Deploy App', completed: false}
  ]

  vm.toggleChecked = function(todo) {
    todo.completed = !todo.completed;
    vm.remaining = tasksRemaining(vm.todos);
  }

  vm.remaining = tasksRemaining(vm.todos);

  function tasksRemaining(todos) {
    return todos.filter(todo => !todo.completed).length
  }

}
