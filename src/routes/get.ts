import { IncomingMessage, ServerResponse } from "http";
import { getUserById, getUsers } from "../controllers";
import { processingResponse } from "../utils/processingResponse";

export async function get(req: IncomingMessage, res: ServerResponse) {
	const url = req.url as string;
	const [, , id, ...rest] = url.split("/").filter(Boolean);

	if (req.url === "/api/users") {
		getUsers(req, res);
	} else if (id && !rest.length) {
		getUserById(req, res, id);
	} else {
		processingResponse(res, 404, { message: "Page not found" });
	}
}
