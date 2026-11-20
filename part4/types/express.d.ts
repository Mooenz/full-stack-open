import type { HydratedDocument, Types } from 'mongoose';

interface IUser {
	username: string;
	passwordHash: string;
	name?: string | null;
	blogs: Types.ObjectId[];
}

declare global {
	namespace Express {
		interface Request {
			token?: string;
			user?: HydratedDocument<IUser> | null;
		}
	}
}
