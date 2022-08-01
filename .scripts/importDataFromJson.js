const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var file = require('./data/circles.json');

(async function start() {
	await mongoose.connect('mongodb://localhost:27017/questions-and-answers', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})

	const Circle = require('../models/Circle');

	file.forEach(el => {
		el._id = ObjectID(el._id)
		el.owner = ObjectID(el.owner)

		const c = new Circle(el);
		c.save((err) => {
			console.log(err);
		})

	})


})();