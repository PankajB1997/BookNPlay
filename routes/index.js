var express = require('express');
var router = express.Router();

// Don't allow user access to events list or add new event feature if not logged in
router.get('/', ensureAuthenticated, function(req, res) {
	res.render('index');
});

router.get('/events/events-list', ensureAuthenticated, function (req, res) {
	res.render('events-list');
});

router.get('/events/new-event', ensureAuthenticated, function (req, res) {
	res.render('new-event');
});

function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in.');
		res.redirect('/users/login');
	}
}

// Don't allow user to access login/register/forgotPassword page if already logged in
router.get('/users/login', ensureNotAuthenticated, function(req, res) {
	res.render('login');
});

router.get('/users/register', ensureNotAuthenticated, function(req, res) {
	res.render('register');
});

router.get('/users/forgotPassword', ensureNotAuthenticated, function(req, res) {
	res.render('forgotPassword');
});

router.get('/users/reset-password', ensureNotAuthenticated, function(req, res) {
	res.render('reset-password');
});

function ensureNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		req.flash('error_msg', 'You are already logged in.');
		res.redirect('/');
	}	else {
		return next();
	}
}

module.exports = router;
