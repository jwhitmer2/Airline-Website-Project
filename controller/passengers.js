var express = require('express');
var router = express.Router();
var db = require('../models/db');


// Present form to insert new passenger


router.get('/new', function(req, res) {
	res.render('newPassenger.ejs', {action: '/passengers/new'});
});

// Save Passenger in database
router.post('/new', function (req, res) {
	db.InsertPassenger(req.body, function (err, result) {
		if (err) {
			res.render('insertFail.ejs');
		}
		res.render('insertCon.ejs');			
	})
});

router.get('/all', function(req, res) {
	db.GetAllPassengers(function(err, result) {
		if (err) throw err;
		res.render('PassengerTableToEdit.ejs', {rs: result});
	});
});

router.get('/edit/', function (req, res) {
	db.SelectPassenger(req.query.P_ID, function (err, result) {
		if (err) throw err;
			res.render('PassengerEditForm.ejs', {rs: result});
	});
});

router.post('/save', function( req, res) {
	db.UpdatePassenger(req.body, function (err, result) {
		if (err) {
			res.render('updateFail.ejs');
		}
		res.render('updateCon.ejs');
	});
});

module.exports = router;
