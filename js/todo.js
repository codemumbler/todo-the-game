angular.module('todoApp', [])
	.controller('TodoListController', function() {
		var todoList = this;
		todoList.todos = [
			{text:'learn angular', done:true},
			{text:'build an angular app', done:false}
		];	

		todoList.addTodo = function() {
			if ( todoList.todoText.trim() == '' )
				return;
			todoList.todos.push({text:todoList.todoText, done:false});
			todoList.todoText = '';
		};
	 
		todoList.remaining = function() {
			var count = 0;
			angular.forEach(todoList.todos, function(todo) {
				count += todo.done ? 0 : 1;
			});
			return count;
		};
	}
);