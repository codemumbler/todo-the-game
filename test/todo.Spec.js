describe('TodoListController', function() {
	beforeEach(module('todoApp'));

	var $controller, controller;

	beforeEach(inject(function(_$controller_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
		controller = $controller('TodoListController', { });
	}));

	describe('$controller.addTodo', function() {
		it('add todo', function() {
			controller.todoText = 'abcdefghijklmnopqrstuvwxyz';
			controller.addTodo();
			expect(controller.todos).toEqual([{text:'abcdefghijklmnopqrstuvwxyz', done:false}]);
		});
		
		it('add empty does nothing', function() {
			controller.todoText = '';
			controller.addTodo();
			expect(controller.todos).toEqual([]);
			expect(controller.todoText).toEqual('');
		});
		
		it('add empty trimmed does nothing', function() {
			controller.todoText = ' \t\n';
			controller.addTodo();
			expect(controller.todos).toEqual([]);
			expect(controller.todoText).toEqual('');
		});
	});
	
	describe('$controller.achievement', function() {
		it('add first todo', function() {
			controller.todoText = 'First';
			controller.addTodo();
			expect(controller.achievementsUnlocked).toEqual([{name:'First Added Todo', img:'1.png'}]);
		});
		
		it('no repeat achievements', function() {
			controller.todoText = 'First';
			controller.addTodo();
			controller.todoText = 'Second';
			controller.addTodo();
			expect(controller.achievementsUnlocked).toEqual([{name:'First Added Todo', img:'1.png'}]);
		});
	});
});