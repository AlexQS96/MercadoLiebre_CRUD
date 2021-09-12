const {users ,products} = require('../data/dataBase');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let productsInSale = products.filter(product => product.category === "in-sale")
		let productsVisited = products.filter(product => product.category === "visited")

		let userName = "";

		if(req.session.user != undefined)
		{
			let userProfile = users.find(user => user.id === req.session.user.id)

			userName = userProfile.name;
		}

		console.log(req.session.user);

		res.render("index",{
			productsInSale,
			productsVisited,
			toThousand,
			userName,
			session: req.session
		})
	},

	// Root - Show the stores area
	stores: (req, res) => {
		let userName = "";

		if(req.session.user != undefined)
		{
			let userProfile = users.find(user => user.id === req.session.user.id)

			userName = userProfile.name;
		}

		res.render('stores', {
			userName,
			session: req.session
		});
	},

	// Root - Show the help area
	help: (req, res) => {
		let userName = "";

		if(req.session.user != undefined)
		{
			let userProfile = users.find(user => user.id === req.session.user.id)

			userName = userProfile.name;
		}

		res.render('help', {
			userName,
			session: req.session
		});
	},

	search: (req, res) => {
		let userName = "";

		if(req.session.user != undefined)
		{
			let userProfile = users.find(user => user.id === req.session.user.id)

			userName = userProfile.name;
		}

		let result = [];
		products.forEach(product => {
			if(product.name.toLowerCase().includes(req.query.keywords)){
				result.push(product)
			}
		});

		res.render('results', {
			result,
			toThousand,
			userName,
			search: req.query.keywords,
			session: req.session
		});
	},
};

module.exports = controller;
