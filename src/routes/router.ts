import { IncomingMessage, ServerResponse } from "http";
import { processingResponse } from "../utils/processingResponse";
import { del, get, post, put } from ".";
import cluster from "cluster";

export function router(req: IncomingMessage, res: ServerResponse) {
	cluster.isWorker && console.log(`\x1b[34mResponse from a worker with a process pid:\x1b[0m \x1b[36m${process.pid}\x1b[0m`);
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
