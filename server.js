const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const index = require('./routes/index');
const tasks = require('./routes/tasks');

const app = express();
let port = process.env.PORT || 3000;

// Setup View Engine
app.set('views', path.join(__dirname, 'views'));
// specify engine we want to use
app.set('views engine', 'ejs');
// renders files with html extension
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(__dirname, 'client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set out home page route
app.use('/', index);
// set our api call routes
app.use('/api', tasks);

// Start our server
app.listen(port, function() {
	console.log("Successfully connected to port: ", port);
});
