import {IncomingMessage, ServerResponse} from "http";
import {getAllUsers} from "../data/usersData";

export function getUsers (req:IncomingMessage, res: ServerResponse) {
	const users = getAllUsers()
	res.writeHead(200, {'Content-type':'application/json'})
	res.end(JSON.stringify(users))
}