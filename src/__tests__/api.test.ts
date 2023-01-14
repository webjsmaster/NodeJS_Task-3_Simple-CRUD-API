import supertest from 'supertest';
import { server } from '..';

const createUser = {
	username: 'test',
	age: 27,
	hobbies: ['test'],
};

const createUserErrorField = {
	username: 'test',
	hobbies: ['test'],
};

const updateUser = {
	username: 'test2',
	age: 28,
	hobbies: ['test', 'test2'],
};

let userId = '';

describe('Scenario 1 - all operations', () => {
	it('should be return 200 and empty array', async () => {
		await supertest(server).get('/api/users').expect(200, []);
	});
	it('should be return 201 and create user', async () => {
		const res = await supertest(server).post('/api/users').send(JSON.stringify(createUser));

		userId = res.body.id;

		expect(res.statusCode).toBe(201);
		expect(res.body).toEqual({ id: res.body.id, ...createUser });
	});
	it('should be return 200 and get one user', async () => {
		await supertest(server)
			.get(`/api/users/${userId}`)
			.expect(200, { id: userId, ...createUser });
	});
	it('should be return 200 and update user', async () => {
		await supertest(server)
			.put(`/api/users/${userId}`)
			.send(JSON.stringify(updateUser))
			.expect(200, { id: userId, ...updateUser });
	});
	it('should be return 204 and delete user', async () => {
		await supertest(server).delete(`/api/users/${userId}`).expect(204);
	});
	it('should be return 404 when re-searching user', async () => {
		await supertest(server).get(`/api/users/${userId}`).expect(404);
	});
});

describe('Scenario 2 - operations for which the id is incorrectly specified', () => {
	const invalidId = '24135fd3-ac82-4ef4-a0d5-b2b057524cc5';
	it(`should be return 404 and message 'User not found' when trying to query for one user`, async () => {
		const res = await supertest(server).post('/api/users').send(JSON.stringify(createUser));
		userId = res.body.id;

		await supertest(server).get(`/api/users/${invalidId}`).expect(404, { message: 'User not found' });
	});
	it(`should be return 404 and message 'User not found' when trying to change user`, async () => {
		await supertest(server)
			.put(`/api/users/${invalidId}`)
			.send(JSON.stringify(updateUser))
			.expect(404, { message: 'User not found' });
	});
	it(`should be return 404 and message 'User not found' when trying to delete user`, async () => {
		await supertest(server).delete(`/api/users/${invalidId}`).expect(404, { message: 'User not found' });
	});
});

describe('Scenario 3 - operations for which id is not valid', () => {
	const idIsNotValid = '24135fd3-ac82-4ef4-!!d5-b2b057524cc5';
	it(`should be return 400 and message 'Id not uuid' when trying to query for one user`, async () => {
		const res = await supertest(server).post('/api/users').send(JSON.stringify(createUser));
		userId = res.body.id;

		await supertest(server).get(`/api/users/${idIsNotValid}`).expect(400, { message: 'Id not uuid' });
	});

	it(`should be return 404 and message 'Id not uuid' when trying to change user`, async () => {
		await supertest(server)
			.put(`/api/users/${idIsNotValid}`)
			.send(JSON.stringify(updateUser))
			.expect(400, { message: 'Id not uuid' });
	});

	it(`should be return 404 and message 'Id not uuid' when trying to delete user`, async () => {
		await supertest(server).delete(`/api/users/${idIsNotValid}`).expect(400, { message: 'Id not uuid' });
	});
});

describe('Scenario 4 - operations with other incorrect requests', () => {
	it(`should be return 404 and message 'Page not found' 
    when endpoint specified incorrectly in GET request`, async () => {
		await supertest(server).get(`/api/error`).expect(404, { message: 'Page not found' });
	});

	it(`should be return 404 and message 'Page not found' 
    when endpoint specified incorrectly in POST request`, async () => {
		await supertest(server).post(`/api/error`).expect(404, { message: 'Page not found' });
	});

	it(`should be return 404 and message 'Page not found' 
    when endpoint specified incorrectly in PUT request`, async () => {
		await supertest(server).put(`/api/error`).expect(404, { message: 'Page not found' });
	});

	it(`should be return 404 and message 'Page not found' 
    when endpoint specified incorrectly in DELETE request`, async () => {
		await supertest(server).delete(`/api/error`).expect(404, { message: 'Page not found' });
	});

	it(`should be return 400 and message 'Body does not contain required fields' 
    when Body does not contain required fields`, async () => {
		await supertest(server)
			.post(`/api/users`)
			.send(JSON.stringify(createUserErrorField))
			.expect(400, { message: 'Invalid request body' });
	});
});
