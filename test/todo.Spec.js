describe('TodoListController', function() {
	beforeEach(module('todoApp'));

	var $controller;

	beforeEach(inject(function(_$controller_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
	}));

	describe('$controller.addTodo', function() {
		it('add todo', function() {
			var controller = $controller('TodoListController', { });
			controller.todoText = 'abcdefghijklmnopqrstuvwxyz';
			controller.todos = [ ];
			controller.addTodo();
			expect(controller.todos).toEqual([{text:'abcdefghijklmnopqrstuvwxyz', done:false}]);
		});
	});
});