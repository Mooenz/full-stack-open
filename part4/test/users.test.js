import { test, after, beforeEach, describe } from 'node:test';
import assert from 'node:assert';
import supertest from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import app from '../app.ts';
import User from '../models/user.js';
import helper from '../utils/test_helper.ts';
const api = supertest(app);

beforeEach(async () => {
	await User.deleteMany({});
	const { saltRounds, username, name, password } = helper.userData;
	const passwordHash = await bcrypt.hash(password, saltRounds);
	const user = new User({ username, name, passwordHash });

	await user.save();
});

describe('when there is initially one user in db', () => {
	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

		const usernames = usersAtEnd.map((u) => u.username);
		assert(usernames.includes(newUser.username));
	});

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		assert(result.body.error.includes('expected `username` to be unique'));

		assert.strictEqual(usersAtEnd.length, usersAtStart.length);
	});

	test('User name is invalid', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'rt',
			name: 'Superuser',
			password: 'salainen',
		};

		const res = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.usersInDb();

		assert.strictEqual(usersAtEnd.length, usersAtStart.length);
		assert.strictEqual(res.body.error, 'Username too short');
	});
});

describe('When create password invalid', () => {
	test('Password is incorrect', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'sn',
		};

		const res = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.usersInDb();

		assert.strictEqual(usersAtEnd.length, usersAtStart.length);
		assert.strictEqual(res.body.error, 'Password too short');
	});
});

after(async () => {
	await mongoose.connection.close();
});
