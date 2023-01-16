import { IncomingMessage, ServerResponse } from 'http';
import { users } from '..';
import { processingResponse } from '../utils';

export async function getUsers(req: IncomingMessage, res: ServerResponse) {
	const usersData = users.getAll();
	processingResponse(res, 200, usersData);
}
