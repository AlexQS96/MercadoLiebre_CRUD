const {users ,products,writeJSON} = require('../data/dataBase');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		let userName = "";

		if(req.session.user != undefined)
		{
			let userProfile = users.find(user => user.id === req.session.user.id)

			userName = userProfile.name;
		}

		res.render('products', {
			products,
			message : "Todos los Productos",
			toThousand,
			userName,
			session: req.session
		});
	},

	// Root - Show all products with offer
	offers: (req, res) => {
		let userName = "";

		if(req.session.user != undefined)
		{
			let userProfile = users.find(user => user.id === req.session.user.id)

			userName = userProfile.name;
		}

		let productsFiltered = products.filter(offer => offer.discount > 0)

		res.render('products', {
			products : productsFiltered,
			message : "Todos los Productos en Oferta",
			toThousand,
			userName,
			session: req.session
		});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let userName = "";

		if(req.session.user != undefined)
		{
			let userProfile = users.find(user => user.id === req.session.user.id)

			userName = userProfile.name;
		}

		let product = products.find(product => product.id === +req.params.id)

		res.render('detail', {
			product,
			toThousand,
			userName,
			session: req.session
		})
	},

	// Create - Form to create
	create: (req, res) => {
		let userName = "";

		if(req.session.user != undefined)
		{
			let userProfile = users.find(user => user.id === req.session.user.id)

			userName = userProfile.name;
		}

		res.render('product-create-form' ,{
			userName,
			session: req.session
		})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		
		let lastID = 1;

		products.forEach(product => {
			if(product.id > lastID)
			{
				lastID = product.id;
			}
		})

		const {name, price, discount ,category, description, image} = req.body

		let newProduct = {
			id: lastID +1,
			name,
			price,
			discount,
			category,
			description,
			image : req.file ? req.file.filename : "default-image.png"
		}

		products.push(newProduct)

		writeJSON(products)

		res.redirect(`/products#${req.params.id}`)
	},

	// Update - Form to edit
	edit: (req, res) => {
		let product = products.find(product => product.id === +req.params.id)
		let userName = "";

		if(req.session.user != undefined)
		{
			let userProfile = users.find(user => user.id === req.session.user.id)

			userName = userProfile.name;
		}

		res.render('product-edit-form', {
			product,
			userName,
			session: req.session
		})
	},
	// Update - Method to update
	update: (req, res) => {

		const {name, price, discount ,category, description} = req.body

		products.forEach(product => {
			if(product.id === +req.params.id){
				product.id = product.id,
				product.name = name,
				product.price = price,
				product.discount = discount,
				product.category = category,
				product.description = description,
				product.image = req.file ? req.file.filename : product.image
			}
		})

		writeJSON(products)

		res.redirect(`/products#${req.params.id}`)

		res.send(`Has editado el producto ${name}`)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let product = products.find(product => product.id === +req.params.id);

		products.forEach(product => {
			if(product.id === +req.params.id){
				let productToDestroy = products.indexOf(product);
				products.splice(productToDestroy, 1);
			}
		})

		writeJSON(products);

		res.send(`Has Eliminado el producto ${product.name}`)
	}
};

module.exports = controller;