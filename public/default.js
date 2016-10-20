/* global angular */

const myApp = angular.module('myApp', []);

myApp.controller('HomeController', homeController);

homeController.$inject = ['$http'];

function homeController($http) {

  const vm = this;

  vm.message = 'Task List';
  vm.todos = [];


  loadTodos();

  vm.remaining = tasksRemaining(vm.todos);
  function loadTodos() {
    $http.get('/todos').success(todos => {
      vm.todos = todos
    })
  }
  vm.toggleChecked = function(todo) {
    todo.completed = !todo.completed;
    vm.remaining = tasksRemaining(vm.todos);
  }


  vm.createTodo = function(input) {
    $http.post('/todos', {text: input, completed: false}).success(() => {
      vm.todos.push({text: input, completed: false})
    })
  }


  function tasksRemaining(todos) {
    return todos.filter(todo => !todo.completed).length
  }

}
