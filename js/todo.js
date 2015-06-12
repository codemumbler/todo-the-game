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
		todoList.experience = 0;
		todoList.level = 1;

		todoList.addTodo = function() {
			if ( todoList.todoText.trim() != '' ) {
				todoList.todos.push({
					text : todoList.todoText, 
					done : false
				});
				todoList.gainExperience(5);
				todoList.addAchievement(achievements.firstCreated);
			}
			todoList.todoText = '';
		};
		
		todoList.addAchievement = function(achievement) {
			if ( todoList.achievementsUnlocked.indexOf(achievement) === -1 )
				todoList.achievementsUnlocked.push(achievement);
		};
		
		todoList.gainExperience = function(exp) {
			todoList.experience += exp;
			if ( todoList.experience > 100 ) {
				todoList.level = 2;
			}
		};
		
		$scope.complete = function() {
			todoList.gainExperience(10);
			todoList.addAchievement(achievements.firstCompleted);
		};
	}
);