import cluster from "cluster";
import { IncomingMessage, ServerResponse } from "http";
import { users } from "..";
import { parseData } from "../utils/parseData";
import { processingResponse } from "../utils/processingResponse";

export async function createUser(req: IncomingMessage, res: ServerResponse) {
	try {
		const data = await parseData(req);
		const { username, age, hobbies } = JSON.parse(data as string);
		if (username && age && hobbies) {
			let user: any = users.insertUser(JSON.parse(data as string));

            let allUsers = users.getAll();

			if (cluster.isWorker) {
                cluster.worker?.send(allUsers)
			} else {
                cluster.emit("fork", allUsers)
            }
			processingResponse(res, 201, user);
		} else {
			processingResponse(res, 400, { message: "Body does not contain required fields" });
		}
	} catch (error) {
		processingResponse(res, 500, { message: "Error while passing request parameters" });
	}
}
