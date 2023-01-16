import { IncomingMessage, ServerResponse } from 'http';
import { createUser } from '../controllers';
import { processingResponse } from '../utils';

export function post(req: IncomingMessage, res: ServerResponse) {
	if (req.url === '/api/users') {
		createUser(req, res);
	} else {
		processingResponse(res, 404, { message: 'Page not found' });
	}
}
