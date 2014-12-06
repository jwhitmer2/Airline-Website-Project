var express = require('express');
var router = express.Router();
var db = require('../models/db');

/* Search for flights*/


router.get('/search', function(req, res){
	res.render('searchFlights.ejs', {action: '/flight/search'});
});

router.post('/search', function (req, res) {
	db.SearchFlight(req.body, function (err, result) {
		if (err) throw err;
		res.render('displayFlights.ejs', {rs: result});
	});
});


router.get('/all', function (req, res) {
	db.GetUnbookedView(function (err, result) {
		if (err) throw err;
		res.render('displayUnFlights.ejs', {rs: result});
	});
});

router.get('/book/', function (req, res) {
	var result = req.query.FlightNo;
	res.render('bookingPage.ejs', {rs: result});
});

router.post('/save', function (req, res) {
	db.BookFlight(req.body, function (err, result) {
		if (err) {
			res.render('bookingFail.ejs');
		}
		res.render('bookingCon.ejs');
	});
});
module.exports = router;
		
