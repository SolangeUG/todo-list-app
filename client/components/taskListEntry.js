var angApp = angular.module('angular-app', []);

angApp.component('taskListEntry', {
	templateUrl: 'client/templates/taskListEntry.html',
	controller: function($http) {
		$ctrl = this;
		// switch the edit value of a task to the opposite of what it currently is
		$ctrl.toggleEdit = function(task) {
			task.editing = ! task.editing;
		}

		// updateTask function (API function)
		$ctrl.updateTask = function(task) {
			// check for empty edit values
			if (! task.task) {
				return alert('Please, enter a valid task!');
			}

			// let's set our task to an object that can be updated
			task.editing = false;
			task = {
				task: task
			}

			// let's send our update request
			$http.put('/api/tasks/' + task.task._id, task)
				.then((res) => {
					$ctrl.toggleEdit(task);
				}
			)
		}

		// deleteTask function (API function)
		$ctrl.deleteTask = function(task) {
			$http.delete('/api/tasks/' + task.task._id)
				.then((res) => {
					let i = $ctrl.tasks.indexOf(task);
					// let's remove the task from our taskList
					$ctrl.tasks.splice(i, 1);
				}
			)
		}
	},

	bindings: {
		task: '<', //binding the individual task
    tasks: '<' //binding the entire task list
	}
});
