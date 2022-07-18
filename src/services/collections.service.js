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
		limit: 10,
		skip: 0,
	}

	if (query.page && query.pageSize) {
		pagination.limit = parseInt(query.pageSize);
		pagination.skip = Math.max(0, (parseInt(query.page) - 1)) * pagination.limit;
	}

	// Populate properties
	let populate = '';
	let limitPopulate = ''
	if (query.populate) {
		populate += query.populate;

		if (query.populate.includes('owner')) {
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

// TODO Disabled editing and deleting on questions and circles if they have children
exports.update = async (collection, _id, data, userId) => {
	const result = await collections[collection].findById(_id);

	if (result.owner != userId) throw new Error('Only owners can update items!')

	if (collection === 'answers') {
		result.body = data.body;
	} else if (collection === 'questions') {
		result.body = data.body;
		result.parent = data.parent;
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

// TODO Disabled editing and deleting on questions and circles if they have children
exports.delete = async (collection, _id, userId) => {
	const item = await collections[collection].findById(_id);

	if (item.owner != userId) throw new Error('Only owners can delete items!')

	item.remove()
}

exports.vote = async (collection, itemId, userId, vote) => {
	const item = await collections[collection].findById(itemId);
	item.upvotes = item.upvotes.filter(x => x._id != userId);
	item.downvotes = item.upvotes.filter(x => x._id != userId);

	if (vote.upvote) {
		item.upvotes.push(userId);
	} else if (vote.downvote) {
		item.downvotes.push(userId);
	}
	item.save();

	return item;
}

