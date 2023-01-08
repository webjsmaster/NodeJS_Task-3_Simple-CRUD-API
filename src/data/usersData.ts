import { v4 as uuid } from "uuid";

export interface IUser {
	id?: string;
	username: string;
	age: number;
	hobbies: string[];
}

export let users: IUser[] = [
	// {
	// 	id: "24135fd3-ac82-4ef4-a0d5-b2b057524cc5",
	// 	username: "yuranius",
	// 	age: 39,
	// 	hobbies: ["nodeJs", "reactJs"],
	// },

	// {
	// 	id: "24135fd3-ac82-4ef4-a0d5-c5t757524cc5",
	// 	username: "yulia",
	// 	age: 21,
	// 	hobbies: ["nodeJs", "Angular"],
	// },
];

export function fetchAllUsers() {
	return users;
}

export function fetchOneUser(id: string) {
	return users.find((user: IUser) => user.id === id);
}

export function addUser(data: IUser) {
	const id = uuid();
	users.push({ id, ...data });
	return { id, ...data };
}

export function changeUser(id: string, data: IUser) {
	if(!users.find((user: IUser) => user.id === id)){
		return
	}
	users = users.map((user) => (user.id === id ? { id, ...data } : user))
	return { id, ...data }
}

export function delUser (id: string) {
	if(users.find((user: IUser) => user.id === id)){
		users = users.filter ( (user) => user.id !== id)
		return id
	} else {
		return 
	}
}