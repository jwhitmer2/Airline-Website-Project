var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});


/* index file that links to various examples */
router.get('/', function(req, res){
    // use render instead of send, to replace the placeholders in index.ejs with the Key Value Pairs (KVP).
    res.render('index');
});


/* Example 1 - HTML Form w/o Ajax or Database Interaction */
//router.get('/simpleForm', function(req, res){
 //   res.render('simpleform.ejs', {action: '/displayFormData'});
//});

/* Example 1 - Display form data submitted above */
//router.post('/displayFormData', function(req, res) {
//    console.log(req.body);
 //   res.render('displayFormData.ejs', req.body );
//});


module.exports = router;

