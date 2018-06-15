const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	}
});

const User = module.exports = mongoose.model('User', UserSchema);

//Searched user by its Id
module.exports.getUserById = (id, callback) => {
	User.findById(id, callback);
};

//Searches user by username
module.exports.getUserByUsername = (username, callback) => {
	const query = { username: username };
	User.findOne(query, callback);
};

//Adding user to Database
module.exports.addUser = (newUser, callback) => {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) {
				throw err;
			}else{
				newUser.password = hash;
				newUser.save(callback);
			}
		});
	});
};

//Comparing Password with hashed password
module.exports.comparePassword = (candiatePassword, hash, callback)=> {
	bcrypt.compare(candiatePassword, hash, (err, isMatch) => {
		if(err) throw err;
		callback(null, isMatch);
	});
};