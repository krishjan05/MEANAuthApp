const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

//Register
router.post('/register', (req, res, next) => {
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	User.addUser(newUser, (err, user) => {
		if(err){
			res.json({success: false, msg: 'Failed to register'});
		}else{
			res.json({success: true, msg: 'Registered Successfully'});
		}
	});
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
	res.send('AUTHENTICATE');
});

//Profile
router.get('/profile', (req, res, next) => {
	res.send('PROFILE');
});

module.exports = router;