
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var middlewares = require('./middlewares');
var ResponseGenerator = require('./response/ResponseGenerator.js');
var endpoints = require('./endpoints.js');
var config = require('./config.js');

var app = express();

// all environments
app.set('port', process.env.PORT || config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(middlewares.rawBody());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Endpoint generateing class
var RG = new ResponseGenerator();

// Displays all of your mocked endpoints by default
app.get('/', routes.index);

// Generate GET requests
endpoints.GET.forEach(function(endpoint) {
	app.get(endpoint.request.path, RG.genGet(endpoint));
});

/*
// Generate POST requests
endpoints.POST.forEach(function(endpoint) {
	responseCallBack = RG(endpoint);
	app.post(endpoint.path, responseCallBack);
});

// Generate PUT requests
endpoints.PUT.forEach(function(endpoint) {
	responseCallBack = RG(endpoint);
	app.get(endpoint.path, responseCallBack);
});

// Generate POST requests
endpoints.POST.forEach(function(endpoint) {
	responseCallBack = RG(endpoint);
	app.get(endpoint.path, responseCallBack);
});
*/

app.post('*', function(req, res) {
	console.log(req.headers);
	console.log(req.params);
	console.log(req.query);
	console.log(req.body);
	res.end();
});

console.log(endpoints);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
