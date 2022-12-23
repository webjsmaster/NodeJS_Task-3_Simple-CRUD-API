export interface IUser {
	id: string;
	username: string;
	age: number;
	hobbies: string[];
}

let users:IUser[] = [
	{
		id: 'fafwer',
		username: 'Вася',
		age: 23,
		hobbies: [
				'nodeJs',
				'reactJs',
		]
	},
	{
		id: 'fafwewaff',
		username: 'Ирина',
		age: 21,
		hobbies: [
			'java script',
			'angular',
		]
	}
]


export function getAllUsers () {
	return users
}

export function getUser (id: string) {
	return users.find((user:IUser) => user.id === id)
}