/* global angular */

const myApp = angular.module('myApp', []);

myApp.controller('HomeController', homeController);

homeController.$inject = ['todosData'];

function homeController(todosData) {

  const vm = this;

  vm.message = 'Task List';
  vm.todos = [];
  vm.remaining = 0;


  todosData.loadTodos().then(todos => {
    vm.todos = todos
    vm.remaining = tasksRemaining(vm.todos)
  })

  vm.toggleChecked = function(todo) {
    todo.completed = !todo.completed;
    vm.remaining = tasksRemaining(vm.todos);
  }

  vm.createTodo = function(input) {
    todosData.createTodo(input).then(todos => {
      vm.todos.push(todos)
    })
  }

  function tasksRemaining(todos) {
    return todos.filter(todo => !todo.completed).length
  }

}

myApp.factory('todosData', todosData)

todosData.$inject = ['$http']

function todosData($http) {

  return {
    loadTodos,
    createTodo
  }

  function loadTodos() {
    return $http.get('/todos').then(res => res.data)
  }

  function createTodo(input) {
    const newTodo = {text: input, completed: false};
    return $http.post('/todos', newTodo).then(res => res.data)
  }

}
