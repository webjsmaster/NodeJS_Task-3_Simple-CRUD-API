import {IncomingMessage, ServerResponse } from 'http';
import { getUsers } from '../controllers';


export function get(req: IncomingMessage, res: ServerResponse ) {

	const [api, users, id, ...rest] = req.url?.toString().split('/').filter(Boolean);


	if (req.url === '/api/users'){
		getUsers(req,res)
	} else {
		res.writeHead(400, {'Content-Type': 'text/plain'})
		res.end( `{"message": "Page not found"}`)
	}
}