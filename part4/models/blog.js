import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 3,
	},
	author: {
		type: String,
		required: true,
		minlength: 3,
	},
	url: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const BlogModel = mongoose.model('Blog', blogSchema);

export default BlogModel;
