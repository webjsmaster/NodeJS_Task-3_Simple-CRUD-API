import cluster from 'cluster';
import * as http from 'http';
import { router } from './routes/router';
import { masterServer, parseArgs, port } from './utils';
import UserDB from './data/User';
import { Body, User } from './types/types';
import os from 'os';

const args = parseArgs();
export const server = http.createServer(router);

export const users = new UserDB();

if (args['cluster']) {
	if (cluster.isPrimary) {
		const numCPUs = os.cpus().length;
		const workerPorts: Array<number> = [];
		const count = 0;

		for (let i = 0; i < numCPUs; i++) {
			const port = 4001 + i;
			workerPorts.push(port);
			const worker = cluster.fork({ WORKER_PORT: port });

			worker.on('message', (msg: Body) => {
				for (const id in cluster.workers) {
					users.setUsers(msg.body);
					cluster.workers[id]?.send(msg.body);
				}
			});
		}

		cluster.on('exit', (worker) => {
			console.log(`Worker ${worker.process.pid} died. Let's launch another worker`);
			cluster.fork();
		});

		masterServer({ workerPorts, count, port });

		cluster.on('message', (msg: Body) => {
			if (msg.type) {
				for (const id in cluster.workers) {
					cluster.workers[id]?.send(msg.body);
				}
			}
		});
	} else {
		server.listen(process.env.WORKER_PORT, () => {
			console.log(`Worker ${process.pid} server running on port: ${process.env.WORKER_PORT}`);
		});

		process.on('message', (msg: Array<User>) => {
			users.setUsers(msg);
		});
	}
} else {
	server.listen(port, () => {
		console.log(`Server running on port: ${port}, thigh pid: ${process.pid}`);
	});
}

process.on('SIGINT', () => {
	server.close(() => {
		process.exit(0);
	});
});

process.on('exit', (code) => {
	console.log('Process closed with status code: ', code);
});
