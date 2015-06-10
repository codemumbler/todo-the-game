angular.module('todoApp', [])
	.controller('TodoListController', function($scope) {
		var todoList = this;
		var achievements = {
			"firstCreated" : {name:'First Added Todo', img:'1.png'}, 
			"firstCompleted" : {name:'First Completed Todo', img:'1.png'} 
		};
		todoList.todos = [ ];
		todoList.achievementsUnlocked = [ ];
		todoList.todoText = '';

		todoList.addTodo = function() {
			if ( todoList.todoText.trim() != '' ) {
				todoList.todos.push({
					text : todoList.todoText, 
					done : false
				});
				todoList.addAchievement(achievements.firstCreated);
			}
			todoList.todoText = '';
		};
		
		todoList.addAchievement = function(achievement) {
			if ( todoList.achievementsUnlocked.indexOf(achievement) === -1 )
				todoList.achievementsUnlocked.push(achievement);
		};
		
		$scope.complete = function() {
			todoList.addAchievement(achievements.firstCompleted);
		};
	}
);