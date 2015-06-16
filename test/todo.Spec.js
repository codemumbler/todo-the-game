describe('TodoListController', function() {
	beforeEach(function(){
	MockFirebase.override();
		module('firebase');
		module('todoApp');
	});

	var $controller, controller;
	var $scope = {};
	var $firebase;
	var $firebaseArray;
	var todos;

	beforeEach(inject(function(_$controller_, _todos_, _$firebase_, _$firebaseArray_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
		todos = _todos_;
		$firebase = _$firebase_;
		$firebaseArray = _$firebaseArray_;
		controller = $controller('TodoListController', { $scope : $scope, todos: todos });
	}));
	
	var addItem = function(item){
		controller.todoText = item;
		var item = controller.addTodo();
		todos.$ref().flush();
		var autoId = null;
		var data = controller.todos.$ref().getData();
		for ( var p in data )
			autoId = p;
		if ( autoId == undefined )
			return null;
		return data[autoId];
	};

	describe('$controller.addTodo', function() {
		it('add todo', function() {
			var item = addItem('abcdefghijklmnopqrstuvwxyz');
			expect(item).toEqual({text:'abcdefghijklmnopqrstuvwxyz', done:false});
		});
		
		it('add empty does nothing', function() {
			var item = addItem('');
			expect(item).toEqual(null);
			expect(controller.todoText).toEqual('');
		});
		
		it('add empty trimmed does nothing', function() {
			var item = addItem(' \t\n');
			expect(item).toEqual(null);
			expect(controller.todoText).toEqual('');
		});
	});
	
	describe('$controller.achievement', function() {
		it('add first todo', function() {
			addItem('First');
			expect(controller.achievementsUnlocked).toEqual([{name:'First Added Todo', img:'1.png'}]);
		});
		
		it('no repeat achievements', function() {
			addItem('First');
			addItem('Second');
			expect(controller.achievementsUnlocked).toEqual([{name:'First Added Todo', img:'1.png'}]);
		});
		
		it('complete first item for achievement', function() {
			addItem('First');
			$scope.complete();
			expect(controller.achievementsUnlocked).toEqual([{name:'First Added Todo', img:'1.png'},{name:'First Completed Todo', img:'1.png'}]);
		});
	});
	
	describe('$controller.experience', function() {
		it('gain 5 experience for items added', function() {
			addItem('First');
			expect(controller.experience).toEqual(5);
		});
		
		it('gain 10 experience for items completed', function() {
			addItem('First');
			$scope.complete();
			expect(controller.experience).toEqual(15);
		});
	});
	
	describe('$controller.level', function() {
		it('gain a level after 100 experience', function() {
			for ( var i =0; i < 7; i++) {
				addItem('First');
				$scope.complete();
			}
			expect(controller.level).toEqual(2);
		});
		it('gain a level after 300 experience', function() {
			for ( var i =0; i < 20; i++) {
				addItem('First');
				$scope.complete();
			}
			expect(controller.level).toEqual(3);
		});
		it('gain a level after 600 experience', function() {
			for ( var i =0; i < 40; i++) {
				addItem('First');
				$scope.complete();
			}
			expect(controller.level).toEqual(4);
		});
	});
});