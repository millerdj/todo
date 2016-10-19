/* global angular */

const myApp = angular.module('myApp', []);

myApp.controller('HomeController', homeController);

homeController.$inject = ['$http'];

function homeController($http) {

  const vm = this;
  vm.message = 'Hello World';

  vm.todos = [];

  loadTodos();

  function loadTodos() {
    $http.get('/todos').success(todos => {
      vm.todos = todos
    })
  }
  vm.toggleChecked = function(todo) {
    todo.completed = !todo.completed;
    vm.remaining = tasksRemaining(vm.todos);
  }

  vm.remaining = tasksRemaining(vm.todos);

  function tasksRemaining(todos) {
    return todos.filter(todo => !todo.completed).length
  }

}
