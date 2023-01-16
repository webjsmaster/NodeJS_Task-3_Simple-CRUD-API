import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import { users } from '..';
import { processingResponse, setActionMassage } from '../utils';

export async function deleteUser(req: IncomingMessage, res: ServerResponse, id: string) {
	if (!validate(id)) {
		return processingResponse(res, 400, { message: 'Id not uuid' });
	}
	try {
		const allUsers = users.deleteOne(id);

		if (allUsers) {
			setActionMassage(allUsers);
			return res.writeHead(204).end();
		} else {
			return processingResponse(res, 404, { message: 'User not found' });
		}
	} catch (error) {
		return processingResponse(res, 500, { message: 'Error while passing request parameters' });
	}
}
