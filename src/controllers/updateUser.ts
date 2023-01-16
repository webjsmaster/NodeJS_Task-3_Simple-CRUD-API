import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import { users } from '..';
import { parseData, processingResponse, setActionMassage, validation } from '../utils';

export async function updateUser(req: IncomingMessage, res: ServerResponse, id: string) {
	if (!validate(id)) {
		return processingResponse(res, 400, { message: 'Id not uuid' });
	}
	try {
		const data = await parseData(req);
		const userData = JSON.parse(data as string);
		const validate = validation(userData);

		if (validate) {
			const user = users.updateOne(id, userData);
			const allUsers = users.getAll();
			setActionMassage(allUsers);
			if (user) {
				processingResponse(res, 200, user);
			} else {
				processingResponse(res, 404, { message: 'User not found' });
			}
		} else {
			processingResponse(res, 400, { message: 'Invalid request body' });
		}
	} catch (error) {
		processingResponse(res, 500, { message: 'Error while passing request parameters' });
	}
}
