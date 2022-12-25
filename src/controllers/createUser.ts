import { IncomingMessage, ServerResponse } from "http";
import { addUser } from "../data/usersData";
import { parseData } from "../utils/parseData";
import { processingResponse } from "../utils/processingResponse";

export async function createUser (req: IncomingMessage, res: ServerResponse) {
    try {
        const data = await parseData(req);
        const { username, age, hobbies } = JSON.parse(data as string)
        if (username && age && hobbies) {
            let user = addUser({ username, age, hobbies })
            processingResponse(res, 201, user)
        } else {
            processingResponse(res, 400, {'message' : 'Body does not contain required fields'})
        }
    } catch (error) {
        processingResponse(res, 500, {'message' : 'Error while passing request parameters'})
    }
}