// All controller logic for CRUD operation will stay here

const blogModel = require('../model/blog-model');
const ObjectID = require('mongodb').ObjectID;

//Custom responder
let responder = {
	respond: (res, response) => {
		res.status(200).send({
			status: 'Success',
			result: response,
		});
	},
	error: (res, code, error) => {
		res.status(code).send({
			status: 'Error',
			error: {
				code: `E${code}`,
				message: error,
			},
		});
	},
};

//Get blog by parameter :blogId
exports.getblogById = (req, res, next, id) => {
	if (ObjectID.isValid(id)) {
		try {
			blogModel.findById(id).exec((err, blog) => {
				if (err) {
					return responder.error(res, 500, 'Internal server error');
				} else if (blog == null || blog == undefined) {
					return responder.error(res, 404, 'blog not found');
				}

				req.blog = blog;
				next();
			});
		} catch (error) {
			console.log(error);
			return responder.error(res, 500, 'Internal server error');
		}
	} else {
		return responder.error(res, 400, 'Invalid blog ID');
	}
};

// Create and Save a new blog
exports.create = (req, res) => {
	// Validating blog req body
	let reqKeys = ['category', 'title', 'content'];
	let reqBody = req.body;
	let reqBodyKeys = [];

	for (key in reqBody) reqBodyKeys.push(key);

	for (key of reqKeys)
		if (!reqBodyKeys.includes(key))
			return responder.error(res, 400, 'Bad request, Missing arguments');
		else if (reqBody[key].trim() == '' || reqBody[key] == null) {
			return responder.error(
				res,
				400,
				`Bad request, ${key} cannot be empty or null`
			);
		}
	// Saving blog
	try {
		const blog = new blogModel(req.body);
		blog.save((err, blog) => {
			if (err) {
				console.log(err);
				return responder.error(res, 500, 'Internal server error.');
			}
			let responseObj = {
				message: 'blog has been posted',
				blog: blog,
			};
			responder.respond(res, responseObj);
		});
	} catch (error) {
		console.log(error);
		return responder.error(res, 500, 'Internal server error');
	}
};

// Retrieve and return all blog from the database.
exports.findAll = (req, res) => {
	// TODO from below
	try {
		blogModel.find().exec((err, blog) => {
			if (err) {
				return responder.error(res, 500, 'Internal server error');
			}

			responder.respond(res, blog);
		});
	} catch (error) {
		console.log(error);
		return responder.error(res, 500, 'Internal server error');
	}
};

// Find a single blog with a blogId
exports.findOne = (req, res) => {
	// TODO from below
	responder.respond(res, req.blog);
};

// Update a blog identified by the blogId in the request
exports.update = (req, res) => {
	// TODO from below
	let blog = req.blog;
	const reqBody = req.body;

	for (key in reqBody) {
		if (reqBody[key].trim() == '' || reqBody[key] == null) {
			return responder.error(
				res,
				400,
				`Bad request, ${key} cannot be empty or null`
			);
		}
		blog[key] = reqBody[key] ? reqBody[key] : [blog.key];
	}
	try {
		blog.save((err, updatedblog) => {
			if (err) {
				console.log('Failed to update blog');
				return responder.error(res, 500, 'Internal server error');
			}
			let responseObj = {
				message: 'blog has been updated',
				blog: updatedblog,
			};
			responder.respond(res, responseObj);
		});
	} catch (error) {
		console.log(error);
		return responder.error(res, 500, 'Internal server error');
	}
};

// Delete a blog with the specified blogId in the request
exports.deleteById = (req, res) => {
	// TODO from below
	let blog = req.blog;
	try {
		blog.remove((err, deletedblog) => {
			if (err) {
				console.log('Failed to delete blog');
				return responder.error(res, 500, 'Internal server error');
			}
			let responseObj = {
				message: 'blog has been deleted',
				blog: deletedblog,
			};
			responder.respond(res, responseObj);
		});
	} catch (error) {
		console.log(error);
		return responder.error(res, 500, 'Internal server error');
	}
};
