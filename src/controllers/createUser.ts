import { IncomingMessage, ServerResponse } from 'http';
import { users } from '..';
import { User } from '../types/types';
import { parseData, processingResponse, setActionMassage, validation } from '../utils';

export async function createUser(req: IncomingMessage, res: ServerResponse) {
	try {
		const data = await parseData(req);
		const userData = JSON.parse(data as string);
		const validate = validation(userData);

		if (validate) {
			const user: User = users.insertUser(JSON.parse(data as string));
			const allUsers = users.getAll();
			setActionMassage(allUsers);
			processingResponse(res, 201, user);
		} else {
			processingResponse(res, 400, { message: 'Invalid request body' });
		}
	} catch (error) {
		processingResponse(res, 500, { message: 'Error while passing request parameters' });
	}
}
