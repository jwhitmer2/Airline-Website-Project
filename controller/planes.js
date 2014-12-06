var express = require('express');
var router = express.Router();
var db = require('../models/db');


router.get('/select', function (req, res) {
	db.GetPlanes(function (err, result) {
		if (err) throw err;
		res.render('displayPlaneDropDown.ejs', {rs: result});
	});
});

router.post('/view', function (req, res) {
	db.PlaneByID( req.body, function(err, result) {
		if (err) {
			throw err;
		}
		else if (typeof result[0].PlaneID == 'undefined'){
			res.send('No planes exist for that.');
		}
		else {
			var placeholders = {
				manufacturer: result[0].Manufacturer,
				model: result[0].Model,
				passengers: result[0].MaxPassengers
			};
			res.render('displayPlaneInfo.ejs', placeholders);
		}
	});
});

module.exports = router;
	
