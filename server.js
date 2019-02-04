var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [];

var middleware = require('./middleware.js');

app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, function (req, res) {
	res.send('About us!');
});

// GET /todos
app.get('/todos', middleware.requireAuthentication, function (req, res) {
	res.json(todos);
});

// GET /todo:id
app.get('/todos/:id', middleware.requireAuthentication, function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo;

	todos.forEach( function (todo) {
		if (todoId === todo.id) {
			matchedTodo = todo;
		}
	});

	if (matchedTodo) {
		res.json(matchedTodo)
	} else {
		res.status(404).json({ errorMessage: 'is Not Data' });
	}
});

// POST /todos
app.post('/todos', function (req, res) {
	var body = _.pick(req.body, 'name', 'completed');

	if (!_.isBoolean(body.completed) || !_.isString(body.name) || body.name.trim().length === 0) {
		return res.status(400).send();
	}

	body.name = body.name.trim();	
	body.id = todoNextId++;

	todos.push(body);
	
	res.json(body);
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
	console.log('Express server started on port ' + PORT + '!');
});