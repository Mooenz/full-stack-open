import Blog from '../models/blog.js';
import User from '../models/user.js';

const initialBlog = [
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
		likes: 5,
	},
];

const userData = {
	saltRounds: 1,
	username: 'root',
	name: 'example',
	password: 'salainen',
};

const blogsInDb = async () => {
	const notes = await Blog.find({});
	return notes.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};

export default { initialBlog, blogsInDb, usersInDb, userData };
