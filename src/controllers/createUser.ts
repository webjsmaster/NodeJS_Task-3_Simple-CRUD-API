import { IncomingMessage, ServerResponse } from "http";
import { users } from "..";
import { User } from "../types/types";
import { parseData } from "../utils/parseData";
import { processingResponse } from "../utils/processingResponse";
import { setActionMassage } from "../utils/setActionMessage";
import { validation } from "../utils/validation";

export async function createUser(req: IncomingMessage, res: ServerResponse) {
	try {
		const data = await parseData(req);
		const userData = JSON.parse(data as string);
		let validate = validation(userData);

		if (validate) {
			let user: User = users.insertUser(JSON.parse(data as string));
			let allUsers = users.getAll();
			setActionMassage(allUsers)
			processingResponse(res, 201, user);
		} else {
			processingResponse(res, 400, { message: "Invalid request body" });
		}
	} catch (error) {
		processingResponse(res, 500, { message: "Error while passing request parameters" });
	}
}
