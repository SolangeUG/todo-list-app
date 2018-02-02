const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('tasks', ['tasks']);

// set route for retrieving all tasks - GET
router.get('/tasks', function(req, res, next) {
	db.tasks.find(function(err, tasks) {
		if (err) {
			res.status(404);
			res.send(err);
		}
	})
	res.json(tasks);
});

// set route for saving a task - POST
router.post('/tasks', function(req, res, next) {
	let task = req.body;
	if (! task) {
		res.status(404);
		res.json({
			error: 'Provided information is invalid!'
		});
	} else {
		db.tasks.save(task, function(err, task) {
			if (err) {
				res.status(404);
				res.send(err);
			}
			res.json(task);
		})
	}
});

// set route for updating a task - PUT
router.put('/tasks/:id', function(req, res, next) {
  let task = req.body.task;
  let updatedTask = {};
  if (task) {
    updatedTask = task;
    //this is necessary to prevent overwriting errors
    delete updatedTask._id;
  }
  db.tasks.update({_id: mongojs.ObjectId(req.params.id)},
									updatedTask, {}, function(err, task) {
    if (err) {
      res.status(404);
      res.send(err);
    }
    res.json(task);
  });
});

// set route for deleting a task - DELETE
router.delete('/tasks/:id', function(req, res, next) {
  db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
    if (err) {
      res.status(404);
      res.send(err);
    }
    res.json(task);
  });
});

module.exports = router;
