const router = require("express").Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require("../middleware/jwt");


router.post('/signup', (req, res, next) => {
	const { email, password, role, firstName, lastName, profilePicture, typeOfTherapy } = req.body
	// check if email or password are empty
	if (email === '' || password === '' ) {
		res.status(400).json({ message: 'Provide email and password ' })
		return
	}
	// validate the email address
	// const emailValid = email.includes('@')
	// if (!emailValid) {
	// 	res.status(400).json({ message: 'Provide a valid email address' })
	// 	return
	// }
	if (password.length < 4) {
		res.status(400).json({ message: 'Password has to be 4 chars min' })
		return
	}
	// check the database if a user with the same email exists
	User.findOne({ email })
		.then(foundUser => {
			// if the user already exists send an error
			if (foundUser) {
				res.status(400).json({ message: 'User already exists' })
				return
			}
			// hash the password
			const salt = bcrypt.genSaltSync();
			const hashedPassword = bcrypt.hashSync(password, salt)
			// create the new user
			return User.create({ email, password: hashedPassword, role, firstName, lastName, profilePicture, typeOfTherapy })
				.then(createdUser => {
					const { email, _id, role, firstName, lastName, profilePicture, typeOfTherapy } = createdUser
					const user = { email, _id, role, firstName, lastName, profilePicture, typeOfTherapy }
					res.status(201).json({ user: user })
				})
				.catch(err => {
					console.log(err)
					res.status(500).json({ message: 'Internal Server Error' })
				})
		})
});

router.post('/login', (req, res, next) => {
	const { email, password } = req.body
	if (email === '' || password === '') {
		res.status(400).json({ message: 'Provide email and password' })
		return
	}
	User.findOne({ email })
		.then(foundUser => {
			if (!foundUser) {
				res.status(400).json({ message: 'User not found' })
				return
			}
			const passwordCorrect = bcrypt.compareSync(password, foundUser.password)
			if (passwordCorrect) {
				const { _id, email } = foundUser
				const payload = { _id, email }
				// create the json web token
				const authToken = jwt.sign(
					payload,
					process.env.JWT_SECRET,
					{ algorithm: 'HS256', expiresIn: '12h' }
				)
				res.status(200).json({ authToken })
			} else {
				res.status(401).json({ message: 'Unable to authenticate' })
			}
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({ message: 'Internal Server Error' })
		})
});

router.get('/verify', isAuthenticated, (req, res, next) => {
	// if the token is valid we can access it on : req.payload
	console.log('request payload is: ', req.payload)
	res.status(200).json(req.payload)
});

// router.post('/login', (req, res, next) => {
// 	const { email, password } = req.body;
// 	// check if we have a user with that username in the database
// 	User.findOne({ email: email })
// 		.then(userFromDB => {
// 			if (userFromDB === null) {
// 				// if not -> the username is not correct -> show login again
// 				res.status(400).json({ message: 'Invalid email or password.'})
// 			}
// 			// username is correct
// 			// we check the password from the input against the hash in the database
// 			// compareSync() returns true or false 
// 			if (bcrypt.compareSync(password, userFromDB.password)) {
// 				// if it matches -> all credentials are correct
// 				// we log the user in
// 				req.session.user = userFromDB;
// 				res.status(200).json(userFromDB);
// 			} else {
// 				// if the password is not matching -> show the form again 
// 				res.status(400).json({ message: 'Invalid email or password.'})
// 			}
// 		})
// });
// router.post('/signup', (req, res, next) => {
// 	console.log(req.body);
// 	const {password, email} = req.body;
// 	// validation
// 	// is the password 4+ chars
// 	if (password.length < 4) {
// 		// if not show the signup form again with a message
// 		res.status(400).json({ message: 'Your password is too short.' });
// 		return;
// 	}
// 	// is the username empty
// 	if (email.length === 0) {
// 		res.status(400).json({ message: 'Username cannot be empty' });
// 		return;
// 	}
// 	// validation passed
// 	// we now check if the username already exists
// 	User.findOne({ email: email })
// 		.then(userFromDB => {
// 			// if user exists 
// 			if (userFromDB !== null) {
// 				// we render signup again
// 				res.status(400).json({ message: 'This name is already used.' });
// 			} else {
// 				// if we reach this line the username can be used
// 				// password as the value for the password field
// 				const salt = bcrypt.genSaltSync();
// 				const hash = bcrypt.hashSync(password, salt);
// 				console.log(hash);
// 				// we create a document for that user in the db with the hashed 
// 				User.create({ password: hash, email: email})
// 					.then(createdUser => {
// 						console.log(createdUser);
// 						// log the user in
// 						req.session.user = createdUser;
//                         res.status(200).json(createdUser);
// 					})
// 					.catch(err => {
// 						next(err);
// 					})
//                     .catch(err => {
//                         console.log(err);
//                     })
// 			}
// 		})
// });

// router.get('/loggedin', (req, res, next) => {
// 	console.log('this is the loggedin in user from the session: ', req.session.user);
// 	const user = req.session.user;
// 	res.json(user);
// });


module.exports = router;