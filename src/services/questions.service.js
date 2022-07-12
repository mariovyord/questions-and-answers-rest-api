const Question = require('../models/Question');

exports.getAll = async () => {
	return Question.find({});
}

exports.create = async (data) => {
	const question = new Question(data);
	await question.save();
	return question;
}

exports.update = async (data) => {
	const question = await Question.findById(data._id);

	question.body = data.body;
	question.parent = data.parent;
	question.meta.circle = data.meta.circle;
	await question.save();

	return question;
}

exports.delete = async (_id) => {
	return Question.findByIdAndDelete(_id);
}