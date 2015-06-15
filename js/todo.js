var todoApp = angular.module('todoApp', ["firebase"]);
todoApp.controller('TodoListController', function($scope, $firebaseArray) {
		var firebaseRef = new Firebase('https://blinding-heat-4074.firebaseio.com/');
		var todoList = this;
		var achievements = {
			"firstCreated" : {name:'First Added Todo', img:'1.png'}, 
			"firstCompleted" : {name:'First Completed Todo', img:'1.png'} 
		};
		var nextLevel = function(level) {
			if ( level == 1 )
				return 100;
			return (level * 100) + nextLevel(level-1);
		};
		todoList.todos = $firebaseArray(firebaseRef);
		todoList.achievementsUnlocked = [ ];
		todoList.todoText = '';
		todoList.experience = 0;
		todoList.level = 1;

		todoList.addTodo = function() {
			if ( todoList.todoText.trim() != '' ) {
				todoList.todos.$add({
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
			if ( todoList.experience >= nextLevel(todoList.level) ) {
				todoList.level++;
			}
		};
		
		$scope.complete = function(todo) {
			todoList.todos.$save(todo);
			todoList.gainExperience(10);
			todoList.addAchievement(achievements.firstCompleted);
		};
	}
);