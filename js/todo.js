angular.module('todoApp', [])
	.controller('TodoListController', function() {
		var todoList = this;
		todoList.todos = [ ];
		todoList.todoText = '';

		todoList.addTodo = function() {
			if ( todoList.todoText.trim() != '' )
				todoList.todos.push({
					text : todoList.todoText, 
					done : false
				});
			todoList.todoText = '';
		};
	}
);