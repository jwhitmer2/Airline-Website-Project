// import libraries
var express = require('express'),
    ejs     = require('ejs'),
    bodyParser = require('body-parser');

// import routes
var routes = require('./controller/index');
var flight  = require('./controller/flight');
var locations = require('./controller/locations');
var planes = require('./controller/planes');
var passengers = require('./controller/passengers');



// initialize express web application framework
// http://expressjs.com/
var app = express();

// these two lines replace bodyParser()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// configure static directory
app.use(express.static('public'));

//configure view rendering engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// subtitle values access via the header template
app.set('subtitle', 'CS355 Project 2');

//configure routes
app.use('/', routes);
app.use('/flight', flight);
app.use('/locations', locations);
app.use('/planes', planes);
app.use('/passengers', passengers);

app.set('port', 8029);
app.listen(app.get('port'));
console.log("Express server listening on port", app.get('port'));
