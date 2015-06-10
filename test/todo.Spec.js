describe('TodoListController', function() {
	beforeEach(module('todoApp'));

	var $controller, controller;
	var $scope = {};

	beforeEach(inject(function(_$controller_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
		controller = $controller('TodoListController', { $scope : $scope });
	}));
	
	var addItem = function(item){
		controller.todoText = item;
		controller.addTodo();
	};

	describe('$controller.addTodo', function() {
		it('add todo', function() {
			addItem('abcdefghijklmnopqrstuvwxyz');
			expect(controller.todos).toEqual([{text:'abcdefghijklmnopqrstuvwxyz', done:false}]);
		});
		
		it('add empty does nothing', function() {
			addItem('');
			expect(controller.todos).toEqual([]);
			expect(controller.todoText).toEqual('');
		});
		
		it('add empty trimmed does nothing', function() {
			addItem(' \t\n');
			expect(controller.todos).toEqual([]);
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
});