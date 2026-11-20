const NODE_ENV = process.env.NODE_ENV || 'development';

export const infoMessage = (message: string): void => {
	if (NODE_ENV !== 'test') {
		console.log(message);
	}
};
export const errorMessage = (message: string): void => {
	if (NODE_ENV !== 'test') {
		console.error(message);
	}
};
