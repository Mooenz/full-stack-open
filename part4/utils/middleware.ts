import { infoMessage, errorMessage } from '../utils/logger.js';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user.js';

const requestLogger = (request: Request, response: Response, next: NextFunction) => {
	infoMessage(`Method: ${request.method}`);
	infoMessage(`Path: ${request.path}`);
	infoMessage(`Body: ${JSON.stringify(request.body)}`);
	infoMessage('---');
	next();
};

const unknownEndpoint = (request: Request, response: Response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
	errorMessage(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	}

	if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}

	if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
		return response.status(400).json({ error: 'expected `username` to be unique' });
	}

	if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({ error: 'token invalid' });
	}

	if (error.name === 'TokenExpiredError') {
		return response.status(401).json({
			error: 'token expired',
		});
	}

	return next(error);
};

const tokenExtractor = (request: Request, response: Response, next: NextFunction) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.startsWith('Bearer ')) {
		request.token = authorization.replace('Bearer ', '');
	}

	return next();
};

const userExtractor = async (request: Request, response: Response, next: NextFunction) => {
	const token = request.token;
	const secret = process.env.SECRET;

	if (!secret) {
		throw new Error('Secret invalid');
	}

	if (!token) {
		return response.status(401).json({ error: 'token missing' });
	}

	const decodedToken = jwt.verify(token, secret) as JwtPayload;

	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' });
	}

	const user = await User.findById(decodedToken.id);

	if (!user) {
		return response.status(404).json({ error: `User no exist ${user}` });
	}

	request.user = user;
	return next();
};

const middleware = {
	errorHandler,
	unknownEndpoint,
	requestLogger,
	tokenExtractor,
	userExtractor,
};

export default middleware;
