var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [{
	id:1,
	name: 'Gus',
	completed: false
},
{
	id:1,
	name: 'Leng',
	completed: true
},
{
	id:1,
	name: 'Ing',
	completed: true
},
{
	id:1,
	name: 'Max',
	completed: false
}]

var middleware = require('./middleware.js');

app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, function (req, res) {
	res.send('About us!');
});

// GET /todos
app.get('/todos', middleware.requireAuthentication, function (req, res) {
	res.json(todos);
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
	console.log('Express server started on port ' + PORT + '!');
});