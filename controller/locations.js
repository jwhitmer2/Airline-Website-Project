var express = require('express');
var router = express.Router();
var db = require('../models/db');



router.get('/all', function (req, res) {
	db.LocationView(function (err, result) {
		if (err) throw err;
		res.render('displayLocations.ejs', {rs: result});
		}
	);
});

router.get('/', function (req, res) {
	db.SelectFlights ( req.query.airportid, function (err, result) {
		if (err) throw err;
			console.log(result);
			res.render('displayFlights.ejs', {rs: result});
		}
	);
});




module.exports = router;
