// all routes HTTP method (GET/PUT/POST/DELETE) will be present here

module.exports = (app) => {
	// import your existing blog controller here, which contains method for all CRUD operations
	const {
		create,
		findAll,
		findOne,
		update,
		deleteById,
		getblogById,
	} = require('./../controller/blog-controller');

	//Getting blog Object by blog ID
	app.param('blogId', getblogById);

	// APi endpoint to create a new blog item
	app.post('/create-blog', create);

	// API endpoint to get all blog items
	app.get('/get-blog', findAll);

	// API endpoint to get single blog item
	app.get('/get-blog/:blogId', findOne);

	// API endpoint to update blog with blogId
	app.put('/update-blog/:blogId', update);

	// API endpoint to delete blog with blogId
	app.delete('/delete-blog/:blogId', deleteById);
};
