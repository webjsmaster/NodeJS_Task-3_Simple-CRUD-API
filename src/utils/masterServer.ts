import * as http from 'http';
import { ArgsMasterServer } from '../types/types';
import { parseData } from '.';

export function masterServer({ workerPorts, count, port }: ArgsMasterServer) {
	http
		.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
			const body = await parseData(req);

			const options = {
				host: 'localhost',
				port: workerPorts[count],
				path: req.url,
				method: req.method,
				headers: {
					'Content-Type': 'application/json',
					'Content-Length': Buffer.byteLength(body as string),
				},
			};

			const request = http.request(options, (response) => {
				const code = response.statusCode;
				response.setEncoding('utf8');
				code === 204 && res.writeHead(code).end();
				response.on('data', (chunk: any) => {
					res.writeHead(code as number, { 'Content-type': 'application/json' });
					res.end(JSON.stringify(JSON.parse(chunk)));
				});
			});

			request.on('error', (e) => {
				console.error(`problem with request: ${e.message}`);
			});

			request.write(body);
			request.end();

			count++;
			count > workerPorts.length - 1 && (count = 0);
		})
		.listen(port, () => {
			console.log(`Primary ${process.pid} server running on port: ${port}`);
		});
}
