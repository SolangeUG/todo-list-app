var app = angular.module('angular-app', []);

app.component('app', {
	templateUrl: 'client/templates/app.html',
	controller: function($http) {
		// let's ensure that "this" scope isn't lost
		let $ctrl = this;
		$ctrl.tasks = [];

		$http.get('api/tasks')
			.then(function(res) {
				res.data.forEach( (obj) => {
					$ctrl.tasks.push(obj);
				})
			}
		);
	}
});
