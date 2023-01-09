import cluster from "cluster";
import * as http from "http";
import { router } from "./router";
import { parseArgs, port } from "./utils";
import os from "os";

const args = parseArgs();
export const server = http.createServer(router);

import UserDB from "./data/User";
import { Action, User } from "./types/types";
export let users = new UserDB([]);

if (args["cluster"]) {
	if (cluster.isPrimary) {
		const numCPUs = os.cpus().length;

		server.listen(port, () => {
			console.log(`Primary ${process.pid} server running on port: ${port}`);
		});

		for (let i = 0; i < 3; i++) {
			let port = 4001 + i;
			let worker = cluster.fork({ port: port });

			worker.on("message", (msg) => {
				for (const id in cluster.workers) {
					users.setUsers(msg);
					cluster.workers[id]?.send(msg);
				}
			});
		}

		cluster.on("fork", (msg) => {
			for (const id in cluster.workers) {
				cluster.workers[id]?.send(msg);
			}
		});

		//! ===================================-Worker-===================================================
	} else {
		//const port = Number(process.env.port) + Number(cluster.worker?.id)

		server.listen(process.env.port, () => {
			console.log(`Worker ${process.pid} server running on port: ${process.env.port}`);
		});

		process.on("message", (msg: any) => {
			users.setUsers(msg);
		});
	}

	//! ==================================-Worker-====================================================
} else {
	server.listen(port, () => {
		console.log(`Server running on port: ${port}, whith pid: ${process.pid}`);
	});
}

process.on("SIGINT", () => {
	server.close(() => {
		process.exit(0);
	});
});
