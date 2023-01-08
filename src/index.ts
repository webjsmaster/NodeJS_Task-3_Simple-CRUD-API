import cluster from "cluster";
import * as http from "http";
import { router, usersWorker } from "./router";
import { parseArgs, port, processingResponse } from "./utils";
import os from "os";


const args = parseArgs();
export const server = http.createServer(router);

import UserDB from "./data/User";
import { appState } from "./data/state";

export let users = new UserDB([
	// {
	// 	id: "sy",
	// 	age: 34,
	// 	username: "sdag",
	// 	hobbies: [],
	// },
]);


if (args["cluster"]) {
	if (cluster.isPrimary) {
		const numCPUs = os.cpus().length;

		server.listen(port, () => {
			console.log(`Primary ${process.pid} server running on port: ${port}`);
		});


		for (let i = 0; i < 3; i++) {
			let port = 4001 + i;
			cluster.fork({ port: port });
		}



		

        // for (const id in cluster.workers) {
        //     cluster.workers[id]?.on('message', (msg) => {
		// 		let action = JSON.parse(msg).action
        //         console.log('data ==>', msg);
		// 		if (action === 'set'){
		// 			//console.log(JSON.parse(msg).data);
					
		// 			users.insertUser(JSON.parse(msg).data)
		// 		} else if (action === 'get') {
		// 			console.log(users.getAll());

				
		// 			test = users.getAll()

		// 		}
        //     });
        // }


		cluster.on('message', async (worker, msg) => {
			let action = JSON.parse(msg).action
			if (action === 'set'){
				let user:any = users.insertUser(JSON.parse(msg).data)
				worker.send(user)
			} 
		});

		// cluster.on('message', (msg:any) => {
		// 	console.log('PRYMARY USERS', users.getAll());
		// })



		//! ===================================-Worker-===================================================

	} else {

		server.listen(process.env.port, () => {
			console.log(`Worker ${process.pid} server running on port: ${process.env.port}`);
		});


		process.on('message', (msg:any) => {
			console.log('!!MESSAGE FROM PRIMARY!!', msg);
			process.stdout.write(msg)
		})

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
