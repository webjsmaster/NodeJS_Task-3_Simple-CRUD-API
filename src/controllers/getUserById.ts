import { IncomingMessage, ServerResponse } from "http"
import { fetchOneUser } from "../data/usersData"
import { processingResponse } from "../utils/processingResponse"
import { validate } from "uuid"

export function getUserById(req: IncomingMessage, res: ServerResponse, id: string) {

	if (!validate(id)) {
		return processingResponse(res, 400 , {'message': 'Id not uuid'})
	}
	
	const user = fetchOneUser(id)
	
	if(user) {
		processingResponse(res, 200, user)
	} else {
		processingResponse(res, 404 , {'message': 'User not found'})
	}

}
