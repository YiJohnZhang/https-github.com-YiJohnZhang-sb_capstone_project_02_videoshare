const jwt = require('jsonwebtoken');
const createTokenHelper = require('../helpers/createTokenHelper');
const { JWT_SECRET_KEY } = require('../config');

describe('createTokenHelper', function () {

	test('create non-admin token, explicit', function () {
		const token = createTokenHelper({ username: 'test', isElevated: false });
		const payload = jwt.verify(token, JWT_SECRET_KEY);
		expect(payload).toEqual({
			iat: expect.any(Number),
			username: 'test',
			isElevated: false
		});
	});

	test('create non-admin token, implicit', function () {
		
		const token = createTokenHelper({ username: 'test' });
		const payload = jwt.verify(token, JWT_SECRET_KEY);
		expect(payload).toEqual({
			iat: expect.any(Number),
			username: 'test',
			isElevated: false
		});
		
	});

	test('create admin token', function () {
		const token = createTokenHelper({ username: 'test', isElevated: true });
		const payload = jwt.verify(token, JWT_SECRET_KEY);
		expect(payload).toEqual({
			iat: expect.any(Number),
			username: 'test',
			isElevated: true
		});
	});

});
