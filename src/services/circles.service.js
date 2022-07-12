const Circle = require('../models/Circle');

exports.getAll = async () => {
	return Circle.find({});
}

exports.create = async (data) => {
	const circle = new Circle(data);
	await circle.save();
	return circle;
}

exports.update = async (_id, data) => {
	const circle = await Circle.findById(_id);

	circle.title = data.title;
	circle.imageUrl = data.imageUrl;
	circle.description = data.description;
	await circle.save();

	return circle;
}

exports.delete = async (_id) => {
	return Circle.findByIdAndDelete(_id);
}