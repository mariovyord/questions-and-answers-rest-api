const Answer = require('../models/Answer');

// Add sorting
exports.getAll = async (query) => {
	console.log(query);

	const options = {};

	if (query.where) {
		const [prop, value] = query.where.split('=');
		options[prop] = value;
	}

	let sort = {};
	if (query.sortBy) {
		const [sortProp, order] = query.sortBy.split(' ');
		sort[sortProp] = order;
	} else {
		sort.createdAt = 'asc';
	}

	return Answer.find(options).sort(sort);
}

exports.getOne = async (_id) => {
	return Answer.findById(_id);
}

exports.create = async (data) => {
	const answer = new Answer(data);
	await answer.save();
	return answer;
}

exports.update = async (_id, data) => {
	const answer = await Answer.findById(_id);
	answer.body = data.body;
	await answer.save();

	return answer;
}

exports.delete = async (_id) => {
	return Answer.findByIdAndDelete(_id);
}