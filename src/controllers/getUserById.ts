import { IncomingMessage, ServerResponse } from 'http';
import { processingResponse } from '../utils';
import { validate } from 'uuid';
import { users } from '..';

export function getUserById(req: IncomingMessage, res: ServerResponse, id: string) {
	if (!validate(id)) {
		return processingResponse(res, 400, { message: 'Id not uuid' });
	}

	const user = users.getOne(id);
	if (user) {
		processingResponse(res, 200, user);
	} else {
		processingResponse(res, 404, { message: 'User not found' });
	}
}
