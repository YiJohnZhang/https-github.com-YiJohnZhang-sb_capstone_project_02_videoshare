const jwt = require('jsonwebtoken');
const createTokenHelper = require('../helpers/createTokenHelper');
const { JWT_SECRET_KEY } = require('../config');

describe('createTokenHelper', () => {

	test('create non-admin token, explicit', () => {

		const token = createTokenHelper({ username: 'test', isElevated: false });
		const payload = jwt.verify(token, JWT_SECRET_KEY);
		expect(payload).toEqual({
			iat: expect.any(Number),
			username: 'test',
			isElevated: false
		});

	});

	test('create non-admin token, implicit', () => {
		
		const token = createTokenHelper({ username: 'test' });
		const payload = jwt.verify(token, JWT_SECRET_KEY);
		expect(payload).toEqual({
			iat: expect.any(Number),
			username: 'test',
			isElevated: false
		});
		
	});

	test('create admin token', () => {

		const token = createTokenHelper({ username: 'test', isElevated: true });
		const payload = jwt.verify(token, JWT_SECRET_KEY);
		expect(payload).toEqual({
			iat: expect.any(Number),
			username: 'test',
			isElevated: true
		});
		
	});

});
