import express from 'express';
const app = express();
import cors from 'cors';
import { url } from './utils/config.ts';
import middleware from './utils/middleware.ts';
import blogRouter from './controllers/blog.ts';
import UsersRouter from './controllers/users.ts';
import loginRouter from './controllers/login.ts';
import { infoMessage, errorMessage } from './utils/logger.js';
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
infoMessage(`connecting to ${url}`);

mongoose
	.connect(url)
	.then(() => {
		infoMessage('connected to MongoDB');
	})
	.catch((error) => {
		errorMessage(`error connecting to MongoDB: ${error.message}`);
	});

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);
app.use('/api/blogs', blogRouter);
app.use('/api/users', UsersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
