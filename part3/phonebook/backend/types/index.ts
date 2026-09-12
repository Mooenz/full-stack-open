export type bodyPersonaCliente = {
	name: string;
	number: string;
};

export type Person = bodyPersonaCliente & {
	id: number;
};
