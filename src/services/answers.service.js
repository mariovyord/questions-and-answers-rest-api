const Answer = require('../models/Answer');

// Add sorting
exports.getAll = async () => {
	return Answer.find({});
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