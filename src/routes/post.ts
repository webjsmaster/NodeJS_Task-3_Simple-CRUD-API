import { IncomingMessage, ServerResponse } from "http";
import { createUser } from "../controllers";
import UserDB from "../data/User";
import { processingResponse } from "../utils/processingResponse";

export function post (req: IncomingMessage, res: ServerResponse) {
    if (req.url === '/api/users'){
		createUser(req,res)
	} else {
		processingResponse(res, 404, {'message': 'Page not found'})
	}
}