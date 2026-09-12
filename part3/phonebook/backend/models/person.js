import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

const url = process.env.MONGODB_URI;

console.log('Connected to MongoDB:', url);

mongoose
	.connect(url)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB', error.message);
	});

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
	},
	number: {
		type: String,
		minlength: 8,
		validate: {
			validator: function (v) {
				return /\d{2,3}-\d+/.test(v);
			}
		}
	},
});

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const PersonModel = mongoose.model('Person', personSchema);

export default PersonModel;
