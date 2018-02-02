var angApp = angular.module('angular-app', []);

angApp.component('addTask', {
	templateUrl: 'client/templates/addTask.html',

	controller: function($http) {
		let $ctrl = this;
		let dup = false;

		// utility function that checks our list for duplicates
		let checkList = function(tasks, task) {
			tasks.forEach((item) => {
				if (item.task === task) {
					dup = true;
				}
			});
		}

		// addTask function (API function)
		$ctrl.addTask = (task) => {
			// let's check if the task is blank
			if (! task) {
				return alert('Please, enter a task!');
			}

			// let's check if our task already exists
			checkList($ctrl.tasks, task);
			if (dup) {
				dup = false;
				return alert('That task already exists!');
			}

			// let's set our task to an object that can be posted
			task = {
				task: task,
				editing: false
			};

			$http.post('/api/tasks', task)
				.then((res) => {
					// let's add our newly created task to our task list
					$ctrl.tasks.push(res.data);
					// let's reset the input field
					$ctrl.task = '';
				}
			);
		}
	},

	bindings: {
		tasks: '<'
	}
});
