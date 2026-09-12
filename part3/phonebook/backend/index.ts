import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { bodyPersonaCliente } from './types/index.js';
import PersonModel from './models/person.js';

const app = express();

app.use(express.json());
app.use(express.static('dist'));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
	res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req: Request, res: Response) => {
	PersonModel.find({}).then((persons) => {
		res.json(persons);
	});
});

app.get('/api/persons/:id', ({ params: { id } }: Request<{ id: string }>, res, next) => {
	PersonModel.findById(id)
		.then((person) => {
			res.json(person);
		})
		.catch((error) => {
			next(error);
		});
});

app.delete('/api/persons/:id', ({ params: { id } }: Request<{ id: string }>, res, next) => {
	PersonModel.findByIdAndDelete(id)
		.then(() => {
			res.status(204).end();
		})
		.catch((error) => next(error));
});

app.post('/api/persons', ({ body }: Request<unknown, unknown, bodyPersonaCliente>, res) => {
	if (typeof body.name !== 'string' || body.name.trim() === '') {
		return res.status(400).json({ error: 'Name or number is missing' });
	}

	const person = new PersonModel({
		name: body.name,
		number: body.number,
	});

	return person.save().then((savePerson) => {
		res.json(savePerson);
	});
});

app.put('/api/persons/:id', ({ params: { id }, body }: Request<{ id: string }, unknown, bodyPersonaCliente>, res, next) => {
	const updatedPerson = {
		name: body.name,
		number: body.number,
	};

	PersonModel.findByIdAndUpdate(id, updatedPerson, { returnDocument: 'after', runValidators: true, context: 'query' })
		.then((updatedPerson) => {
			if (updatedPerson) {
				res.json(updatedPerson);
			} else {
				res.status(404).end();
			}
		})
		.catch((error) => next(error));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	}

	if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}

	return next(error);
};

app.use(errorHandler);
