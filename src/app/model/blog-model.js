// blog model which expose the schema of blog with it's respective fields

const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
	{
		category: String,
		title: String,
		content: String,
	},
	{
		timeStamps: true,
	}
);

module.exports = mongoose.model('blog', blogSchema);
