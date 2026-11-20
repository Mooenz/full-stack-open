import express, { Request, Response } from 'express';
import BlogModel from '../models/blog.js';
const router = express.Router();
import middleware from '../utils/middleware.ts';

router.get('/', async (request: Request, response: Response) => {
	const blogs = await BlogModel.find({}).populate('user', { username: 1, name: 1 });

	response.status(200).json(blogs);
});

router.get('/:id', async (request: Request, response: Response) => {
	const id = request.params.id;
	const blog = await BlogModel.findById(id).populate('user', { username: 1, name: 1 });

	if (!blog) {
		response.status(404).json({ error: 'Blog no found' });
	}

	response.status(200).json(blog);
});

router.post('/', middleware.userExtractor, async (request: Request, response: Response) => {
	const body = request.body;
	const user = request.user;

	if (!body.likes) {
		body.likes = 0;
	}

	if (!user) {
		return response.status(404).json({ error: 'User no exist' });
	}

	const blog = new BlogModel({
		...body,
		user: user.id,
	});

	const saveBlog = await blog.save();
	user.blogs = user.blogs.concat(saveBlog._id);
	await user.save();

	return response.status(201).json(saveBlog);
});

router.delete('/:id', middleware.userExtractor, async (request: Request, response: Response) => {
	const id = request.params.id;
	const user = request.user;

	if (!user) {
		return response.status(404).json({ error: 'User no exist' });
	}

	const blog = await BlogModel.findById(id).populate('user', { username: 1, name: 1 });

	if (!blog) {
		return response.status(404).json({ error: 'Blog no exist' });
	}

	if (!blog.user) {
		return response.status(404).json({ error: 'User in blog no exist' });
	}

	const blogUserId = blog.user.id.toString();
	const userId = user.id;

	if (userId !== blogUserId) {
		return response.status(401).json({ error: 'User invalid' });
	}

	await BlogModel.findByIdAndDelete(id);
	user.blogs.filter((blog) => blog.id.toString() === blogUserId);
	await user.save();
	return response.status(204).end();
});

router.put('/:id', middleware.userExtractor, async (request: Request, response) => {
	const id = request.params.id;
	const body = request.body;

	const user = request.user;

	if (!user) {
		return response.status(404).json({ error: 'User no exist' });
	}

	const blog = await BlogModel.findById(id).populate('user', { username: 1, name: 1 });

	if (!blog) {
		return response.status(404).json({ error: 'Blog no exist' });
	}

	if (!blog.user) {
		return response.status(404).json({ error: 'User in blog no exist' });
	}

	const blogUserId = blog.user.id.toString();
	const userId = user.id;

	if (userId !== blogUserId) {
		return response.status(401).json({ error: 'User invalid' });
	}

	const updateBlog = await BlogModel.findByIdAndUpdate(id, body);
	return response.status(200).json(updateBlog);
});

export default router;
