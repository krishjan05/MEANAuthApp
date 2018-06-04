const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Getting the configuration for database
mongoose.connect(config.database);

//Mongo DB successfull connection
mongoose.connection.on('connected', () => {
	console.log('Connected to databse ' + config.database);
});

//Mongo DB connection Error
mongoose.connection.on('error', (err) => {
	console.log('Database Error ' + err);
});

const app = express();
const users = require('./routes/users');

const port = 3000;

//CORS Middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Body Parser Middleware
app.use(bodyParser.json());
app.use('/users', users);

//Index route
app.get('/', (req, res) => {
	res.send('Invalid endpoint');
});

//Start Server
app.listen(port, () => {
	console.log('Server running on ' + port);
});
