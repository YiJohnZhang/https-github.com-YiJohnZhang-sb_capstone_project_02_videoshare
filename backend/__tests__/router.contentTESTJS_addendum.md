
```js
	// not sure why Babel has tourble parsing all these `{}` and `[]` after injecting it into router.contet.test.js

	test('400, BRE: \'contractDetails\', username length < 4', async() => {
		
		const response = await request(app)
			.patch('/contents/4/edit')
			.send({
				...TEMPORARY_CONTENT4_REQUEST,
				contractDetails: { 
					views:[{username:"tes",share:1}], 
					engagement:[{username:"testuser1",share:1}] 
				}
			})
			.set('authorization', `Bearer ${user1Token}`);

		expect(response.statusCode).toEqual(400);

	});
	
	test('\'contractDetails\', username length > 32', async() => {

		const response = await request(app)
			.patch('/contents/4/edit')
			.send({
				...TEMPORARY_CONTENT4_REQUEST,
				contractDetails: { views:[{username:"123456789012345678901234567890123",share:1}], engagement:[{username:"testuser1",share:1}] }
			})
			.set('authorization', `Bearer ${user1Token}`);

		expect(response.statusCode).toEqual(400);

	});

	test('\'contractDetails\', missing \'views\'', async() => {

		const response = await request(app)
			.patch('/contents/4/edit')
			.send({
				...TEMPORARY_CONTENT4_REQUEST,
				contractDetails: { engagement:[{username:"testuser1",share:1}] }
			})
			.set('authorization', `Bearer ${user1Token}`);

		expect(response.statusCode).toEqual(400);

	});

	test('\'contractDetails\', missing \'engagement\'', async() => {

		const response = await request(app)
			.patch('/contents/4/edit')
			.send({
				...TEMPORARY_CONTENT4_REQUEST,
				contractDetails: { views:[{username:"testuser1",share:1}] }
			})
			.set('authorization', `Bearer ${user1Token}`);

		expect(response.statusCode).toEqual(400);

	});
```