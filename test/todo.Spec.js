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
	});
	
	describe('$controller.complete', function() {
		it('complete item marked as done', function() {
			addItem('First');
			var item = controller.todos[0];
			$scope.complete(0);
			expect(item.done).toEqual(true);
		});
	});
});