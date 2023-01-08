import { IncomingMessage, ServerResponse } from "http";
import { parseData } from "../utils/parseData";
import { processingResponse } from "../utils/processingResponse";

export async function createUser (req: IncomingMessage, res: ServerResponse) {
    try {
        const data = await parseData(req);
        const { username, age, hobbies } = JSON.parse(data as string)
        if (username && age && hobbies) {

            //let user = users.insertUser(JSON.parse(data as string))


            (process as any).send(JSON.stringify({action: 'set', data: JSON.parse(data as string)}));


            
            processingResponse(res, 201, JSON.parse(data as string))
        } else {
            processingResponse(res, 400, {'message' : 'Body does not contain required fields'})
        }
    } catch (error) {
        processingResponse(res, 500, {'message' : 'Error while passing request parameters'})
    }
}