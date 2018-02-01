const express = require('express');
const router = express.Router();

// set route for Tasks
router.get('/tasks', function(req, res, next) {
	res.send('This is our tasks API');
})

module.exports = router;
