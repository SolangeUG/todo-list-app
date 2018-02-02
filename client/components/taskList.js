var angApp = angular.module('angular-app', []);

angApp.component('taskList', {
	templateUrl: 'client/templates/taskList.html',
	controller: function() {
		// empty controller
	},
	bindings: {
		tasks: '<'
	}
});
