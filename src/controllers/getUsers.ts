import { IncomingMessage, ServerResponse } from "http";
import { fetchAllUsers } from "../data/usersData";
import { processingResponse } from "../utils/processingResponse";

export function getUsers ( req:IncomingMessage, res: ServerResponse ) {
	const users = fetchAllUsers()	
	processingResponse(res, 200, users)
}