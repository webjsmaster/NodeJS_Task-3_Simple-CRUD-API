import { IncomingMessage, ServerResponse } from 'http';
import { deleteUser } from '../controllers';
import { processingResponse } from '../utils';

export function del(req: IncomingMessage, res: ServerResponse) {
	const url = req.url as string;
	const [, , id] = url.split('/').filter(Boolean);

	if (req.url === `/api/users/${id}`) {
		deleteUser(req, res, id);
	} else {
		processingResponse(res, 404, { message: 'Page not found' });
	}
}
