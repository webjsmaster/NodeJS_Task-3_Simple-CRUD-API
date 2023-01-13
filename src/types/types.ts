export interface User {
	id?: string;
	username: string;
	age: number;
	hobbies: Array<string>;
}

export type Action = "setWorker" | "setPrimary";
export interface Body {
	type: Action;
	body: Array<User>;
}

export interface ArgsMasterServer {
	workerPorts: Array<number>;
	count: number;
	port: string | undefined;
}
