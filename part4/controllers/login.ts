import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express, { Request, Response } from 'express';
import User from '../models/user.js';
const loginRouter = express.Router();

loginRouter.post('/', async (request: Request, response: Response) => {
	const { username, password } = request.body;

	const user = await User.findOne({ username });
	const passwordUser = user?.passwordHash;

	if (!passwordUser) {
		throw new Error('invalid password');
	}

	const passwordCorrect = user === null ? false : await bcrypt.compare(password, passwordUser);

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'invalid username or password',
		});
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	};
	
	const secret = process.env.SECRET as string;

	if (!secret) {
		throw new Error('SECRET environment variable is not defined');
	}

	const token = jwt.sign(userForToken, secret, { expiresIn: 60 * 60 });

	return response.status(200).send({ token, username: user.username, name: user.name });
});

export default loginRouter;
