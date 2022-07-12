const Comment = require('../models/Comment');

exports.getAllByParentId = (_id) => {
	return Comment.find({ parent: _id });
}

exports.create = async (data) => {
	const comment = new Comment(data);
	await comment.save();
	return comment;
}

exports.getOne = async (_id) => {
	return Comment.findById(_id);
}

exports.update = async (_id, data) => {
	const comment = await Comment.findById(_id);
	comment.body = data.body;
	await comment.save();

	return comment;
}

exports.delete = async (_id) => {
	return Comment.findByIdAndDelete(_id);
}