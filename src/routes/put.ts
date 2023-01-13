import { IncomingMessage, ServerResponse } from "http";
import { updateUser } from "../controllers";
import { processingResponse } from "../utils/processingResponse";

export function put(req: IncomingMessage, res: ServerResponse) {
	const url = req.url as string;
	const [, , id, ...rest] = url.split("/").filter(Boolean);

	if (req.url === `/api/users/${id}`) {
		updateUser(req, res, id);
	} else {
		processingResponse(res, 404, { message: "Page not found" });
	}
}
