const {users,products,writeUsersJSON} = require('../data/dataBase');
let { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')

const controller = {
	login: (req, res) => {
		res.render("users/login",{
			session: req.session
		})
	},
	register: (req, res) => {
		res.render("users/register",{
			session: req.session
		})
	},
    profile: (req, res) => {
		let userProfile = users.find(user => user.id === req.session.user.id)

		let userName = userProfile.name;

		res.render("users/profile",{
			userProfile,
			userName,
			session: req.session
		})
	},
	purchases: (req, res) => {
		let userProfile = users.find(user => user.id === req.session.user.id)
		let userName = userProfile.name;

		let productPurchased = products.find(productPurchased => productPurchased.id === 9)

		res.render("users/purchases",{
			userProfile,
			userName,
			productPurchased,
			session: req.session
		})
	},
	loginProcess: (req, res) => {
		let errors = validationResult(req);

		if(errors.isEmpty())
		{
			let user = users.find(user => user.username === req.body.username)

			req.session.user = {
				id: user.id,
				name: user.name,
				username: user.username,
				email: user.email,
				birthday: user.birthday,
				address: user.address,
				rol: user.rol,
				interest1: user.interest1,
				interest2: user.interest2,
				interest3: user.interest3,
				interest4: user.interest4,
				interest5: user.interest5,
				avatar: user.avatar
			}

			res.locals.user = req.session.user
			res.redirect('/profile')
		}
		else
		{	
			
			res.render('users/login', {
				errors: errors.mapped(),
				session: req.session
			})
		}
	},
	registerProcess: (req, res) => {
		let errors = validationResult(req);

		if(errors.isEmpty())
		{
			let lastId = 0;

			users.forEach(user => {
				if(user.id > lastId)
				{
					lastId = user.id;
				}
			});

			let {
				name,
				username,
				email,
				birthday,
				address,
				rol,
				interest1,
				interest2,
				interest3,
				interest4,
				interest5,
				avatar,
				pass
			} = req.body

			let newUser = {
				id: lastId + 1,
				name,
				username,
				email,
				birthday : birthday.split("-").reverse().join("-"),
				address,
				rol,
				interest1 : interest1 ? interest1 : "",
				interest2 : interest2 ? interest2 : "",
				interest3 : interest3 ? interest3 : "",
				interest4 : interest4 ? interest4 : "",
				interest5 : interest5 ? interest5 : "",
				avatar: req.file ? req.file.filename : "user-default.jpg",
				pass: bcrypt.hashSync(pass, 12)
			}

			users.push(newUser)
			writeUsersJSON(users)

			res.redirect('/login')
		}
		else
		{
			res.render('users/register', {
				errors: errors.mapped(),
				old: req.body,
				session: req.session
			})
		}
	}
};

module.exports = controller;
