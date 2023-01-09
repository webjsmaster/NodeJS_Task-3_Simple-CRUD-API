import { IncomingMessage, ServerResponse } from "http";
import { processingResponse } from "./utils/processingResponse";
import {del, get, post, put} from "./routes";

export function router(req: IncomingMessage, res: ServerResponse) {
	try {
		switch (req.method) {
			case "GET": {
				get(req, res);
				break;
			}
			case "POST": {
				post(req, res);
				break;
			}
			case "PUT": {
				put(req, res);
				break;
			}
			case "DELETE": {
				del(req, res);
				break;
			}
			default:
				throw new Error("Unsupported operation");
		}
	} catch (error) {
		processingResponse(res, 500, { message: "Server error" });
	}
}
