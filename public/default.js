/* global angular */

const myApp = angular.module('myApp', []);

myApp.controller('HomeController', homeController);

homeController.$inject = ['$scope', 'todosData'];

function homeController($scope, todosData) {

  const vm = this;

  vm.message = 'Task List';
  vm.todos = [];
  vm.remaining = 0;

  init()

  function init() {
    $scope.$watch(tasksRemaining, remaining => vm.remaining = remaining)
    todosData
      .loadTodos()
      .then(todos => vm.todos = todos)
  }

  vm.toggleChecked = function(todo) {
    todosData.updateTodo(todo).then(() => {
      todo.completed = todo.completed;
    })
  }

  vm.createTodo = function(input) {
    todosData.createTodo(input).then(todo => {
      vm.todos.push(todo)
    })
  }

  function tasksRemaining() {
    return vm.todos.filter(todo => !todo.completed).length
  }

}

myApp.factory('todosData', todosData)

todosData.$inject = ['$http']

function todosData($http) {

  return {
    loadTodos,
    createTodo,
    updateTodo
  }

  function loadTodos() {
    return $http.get('/todos').then(res => res.data)
  }

  function createTodo(input) {
    const newTodo = {text: input, completed: false};
    return $http.post('/todos', newTodo).then(res => res.data)
  }

  function updateTodo(todo) {
    const newTodo = Object.assign(todo, {completed: !todo.completed})
    return $http.put('/todos/' + newTodo._id, newTodo).then(res => res.data)
  }

}
