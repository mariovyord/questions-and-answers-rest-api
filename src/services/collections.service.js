const Answer = require('../models/Answer');
const Circle = require('../models/Circle');
const Comment = require('../models/Comment');
const Question = require('../models/Question');

const collections = {
	answers: Answer,
	circles: Circle,
	comments: Comment,
	questions: Question,
}


exports.getAll = async (collection, query) => {
	const options = {};

	// Search
	if (query.where) {
		const [prop, value] = query.where.split('=');
		options[prop] = value;
	}

	// Sort
	let sort = {};
	if (query.sortBy) {
		const [sortProp, order] = query.sortBy.split(' ');
		sort[sortProp] = order;
	} else {
		sort.createdAt = 'asc';
	}

	// Pagination
	const pagination = {
		limit: 20,
		skip: 0,
	}
	if (query.offset && query.pageSize) {
		pagination.skip = parseInt(query.offset);
		pagination.limit = parseInt(query.pageSize);
	}

	// Populate properties
	let populate = '';
	let limitPopulate = ''
	if (query.populate) {
		populate += query.populate;

		if (query.populate === 'owner') {
			limitPopulate += 'firstName lastName imageUrl'
		}
	}

	// Result
	const result = collections[collection]
		.find(options)
		.sort(sort)
		.limit(pagination.limit)
		.skip(pagination.skip)
		.populate(populate, limitPopulate);

	// Return count if specified
	if (query.count === 'true') {
		console.log(query.count)
		return result.countDocuments();
	}

	return result;
}

exports.getOne = async (collection, _id) => {
	return collections[collection].findById(_id);
}

exports.create = async (collection, data) => {
	const result = new collections[collection](data);
	await result.save();
	return result;
}

exports.update = async (collection, _id, data) => {
	const result = await collections[collection].findById(_id);

	if (collection === 'answers') {
		result.body = data.body;
	} else if (collection === 'questions') {
		result.body = data.body;
		result.parent = data.parent;
		result.meta.circle = data.meta.circle;
	} else if (collection === 'circles') {
		result.title = data.title;
		result.imageUrl = data.imageUrl;
		result.description = data.description;
	} else if (collection === 'comments') {
		result.body = data.body;
	}

	await result.save();

	return result;
}

exports.delete = async (collection, _id) => {
	return collections[collection].findByIdAndDelete(_id);
}

