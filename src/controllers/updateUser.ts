import { IncomingMessage, ServerResponse } from "http";
import { validate } from "uuid";
import { changeUser } from "../data/usersData";
import { parseData } from "../utils/parseData";
import { processingResponse } from "../utils/processingResponse";

export async function updateUser (req: IncomingMessage, res: ServerResponse, id:string) {
	if (!validate(id)) {
		return processingResponse(res, 400 , {'message': 'Id not uuid'})
	}
    try {
        const data = await parseData(req);
        const { username, age, hobbies } = JSON.parse(data as string)
        if (username && age && hobbies) {
            let user = changeUser(id, { username, age, hobbies })
            if(user){
                processingResponse(res, 200, user)
            } else {
                processingResponse(res, 404, {'message' : 'User not found'})
            }
        } else {
            processingResponse(res, 400, {'message' : 'Body does not contain required fields'})
        }
    } catch (error) {
        processingResponse(res, 500, {'message' : 'Error while passing request parameters'})
    }
}