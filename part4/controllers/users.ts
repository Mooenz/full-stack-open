import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const usersRouter = express.Router();

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });

	response.status(200).json(users);
});

usersRouter.post('/', async (request: Request, response: Response) => {
	const { username, name, password } = request.body;

	if (typeof username !== 'string') {
		return response.status(400).json({
			error: 'Username missing',
		});
	}

	if (typeof password !== 'string') {
		return response.status(400).json({
			error: 'Password missing',
		});
	}

	const userNameNoSpaces = username.trim();
	const passWordNoSpaces = password.trim();

	if (userNameNoSpaces === '') {
		return response.status(400).json({
			error: 'Username missing',
		});
	}

	if (userNameNoSpaces.length < 3) {
		return response.status(400).json({
			error: 'Username too short',
		});
	}

	if (passWordNoSpaces === '') {
		return response.status(400).json({
			error: 'Password missing',
		});
	}

	if (passWordNoSpaces.length < 3) {
		return response.status(400).json({
			error: 'Password too short',
		});
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(passWordNoSpaces, saltRounds);

	const user = new User({
		username: userNameNoSpaces,
		name,
		passwordHash,
	});

	const savedUser = await user.save();
	return response.status(201).json(savedUser);
});

export default usersRouter;
