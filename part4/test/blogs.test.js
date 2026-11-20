import { test, after, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import supertest from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import app from '../app.ts';
import Blog from '../models/blog.js';
import User from '../models/user.js';
import helper from '../utils/test_helper.ts';
const api = supertest(app);
let TokenUser;

beforeEach(async () => {
	await Blog.deleteMany({});
	await User.deleteMany({});

	//Creamos el usuario
	const { saltRounds, username, name, password } = helper.userData;
	const passwordHash = await bcrypt.hash(password, saltRounds);
	const user = new User({ username, name, passwordHash });

	//Creamos los blogs dentro del usuario y viceversa
	const blogObjects = helper.initialBlog.map((blog) => new Blog({ ...blog, user: user._id }));
	const promiseArray = blogObjects.map((blog) => blog.save());
	const blogsSave = await Promise.all(promiseArray);

	//Guardamos el blog id dentro del usuario
	user.blogs = blogsSave.map((blog) => blog.id);
	await user.save();

	//Iniciamos sesión
	const responseLogin = await api.post('/api/login').send({ username, password }).expect(200);

	TokenUser = responseLogin.body.token;
});

describe('Fetching Blogs', () => {
	test('Blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('There are one blog', async () => {
		const blogs = await api.get('/api/blogs');
		assert.strictEqual(blogs.body.length, helper.initialBlog.length);
	});

	test('add to new blog', async () => {
		const newBlog = {
			title: 'New blog for de proof',
			author: 'Jose Montaño',
			url: 'www.mooenz.me',
			likes: 20,
		};

		await api.post('/api/blogs').set('Authorization', `Bearer ${TokenUser}`).send(newBlog).expect(201);
		const totalBlogsEnd = (await helper.blogsInDb()).length;
		assert.strictEqual(totalBlogsEnd, helper.initialBlog.length + 1);
	});

	test('The likes field is missing from the request', async () => {
		const newBlog = {
			title: 'New blog for de proof',
			author: 'Jose Montaño',
			url: 'www.mooenz.me',
		};

		const response = await api.post('/api/blogs').set('Authorization', `Bearer ${TokenUser}`).send(newBlog).expect(201);
		assert.strictEqual(response.body.likes, 0);
	});

	test('Filed title or url is missing from the request', async () => {
		const newBlog = {
			author: 'Jose Montaño',
		};

		await api.post('/api/blogs').set('Authorization', `Bearer ${TokenUser}`).send(newBlog).expect(400);
	});

	test('Delete a blog', async () => {
		const blogAtStart = await helper.blogsInDb();
		const note = blogAtStart[0];

		await api.delete(`/api/blogs/${note.id}`).set('Authorization', `Bearer ${TokenUser}`).expect(204);

		const blogAtEnd = await helper.blogsInDb();
		assert.strictEqual(blogAtEnd.length, helper.initialBlog.length - 1);
	});

	test('Updating the Like field of a blog', async () => {
		const blogAtStart = await helper.blogsInDb();
		const note = blogAtStart[0];
		const newDataNote = {
			...note,
			likes: note.likes + 1,
		};

		await api.put(`/api/blogs/${note.id}`).send(newDataNote).set('Authorization', `Bearer ${TokenUser}`).expect(200);

		const blogAtEnd = await helper.blogsInDb();
		const updatedBlogInDb = blogAtEnd.find((b) => b.id === note.id);

		assert.strictEqual(updatedBlogInDb.likes, note.likes + 1);
	});
});

after(async () => {
	await mongoose.connection.close();
});
