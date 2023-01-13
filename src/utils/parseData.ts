import { IncomingMessage } from "http";

export async function parseData(req: IncomingMessage) {
	return new Promise((resolve, reject) => {
		try {
			let body = "";
			req.on("data", (chunk) => {
				body = chunk.toString();
			});

			req.on("end", () => {
				resolve(body);
			});
		} catch (error) {
			reject(error);
		}
	});
}
