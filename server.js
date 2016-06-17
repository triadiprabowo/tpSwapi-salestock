/*
** Express Server Configuration
** SWAPI Example Application
** @author: Triadi Prabowo (triadiprabowo@gmail.com)
*/

// Require Dependencies
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	request = require('request'),
	livereload = require('connect-livereload'),
	http = require('http'),
	host = 'localhost',
	port = 3000,
	router = require(__dirname+'/config/router'),
	cors = require(__dirname+'/config/cors'),
	// Initial version all version URI would be /src/{version}/{app_files}
	versionInit = '_v1';

// Configure Express Application
app.set('view cache', true);
app.set('views',__dirname+'/src/_v1/view');
app.set('view engine', 'jade');

// Registering Middleware
// -----------------------
// URI Parsing & Cookies
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// Set access control origin
app.use(cors);
app.use(livereload());

// Set distribution folder
app.use('/dist', express.static(__dirname+'/dist'));

// Routing List
// ------------------------
app.get('/', router.index);
app.get('/character/:id', router.character);
app.get('/movies/:id', router.movies)
app.get('/app/bing/images/:key', router.bingImgSearch);

// Listen to HTTP Server
// Server Configuration
http.createServer(app, function(req, res, next) {
	if(req.url == '/favicon.ico') {
		res.writeHead(200, {'Content-Type': 'image/x-icon'});
		res.end();
		return;
	}
}).listen(port, function() {
	console.log('Express server listening and running on port '+port);	
});