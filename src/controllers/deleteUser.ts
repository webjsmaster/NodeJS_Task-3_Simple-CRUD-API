import { IncomingMessage, ServerResponse } from "http";
import { validate } from "uuid";
import { delUser } from "../data/usersData";
import { parseData } from "../utils/parseData";
import { processingResponse } from "../utils/processingResponse";

export async function deleteUser(req: IncomingMessage, res: ServerResponse, id: string) {
	if (validate(id)) {
		let data = delUser(id);
		if (data) {
			res.writeHead(204).end();
		} else {
            processingResponse(res, 404, { message: "User not found" });
        }
	} else {
		return processingResponse(res, 400, { message: "Id not uuid" });
	}
}
