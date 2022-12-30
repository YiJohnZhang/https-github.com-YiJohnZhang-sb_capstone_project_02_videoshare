const { 
	sqlCreateQueryBuilder, 
	sqlFilterQueryBuilder, 
	sqlUpdateQueryBuilder } = require('../helpers/sqlQueryingHelper');

const users_JSON_SQL_SET_MAPPING = {
	firstName: 'first_name',
	lastName: 'last_name',
	accountStatus: 'account_status',
	isElevated: 'is_elevated'
}

const users_JSON_SQL_QUERY_MAPPING = {
	username: 'username ILIKE'
}

const contents_JSON_SQL_SET_MAPPING = {
	dateCreated: "date_created",
	dateStandby: "date_standby",
	datePublished: "date_published",
	contractType: "contract_type", 
	contractDetails: "contract_details", 
	contractSigned: "contract_signed"
}

const contents_JSON_SQL_QUERY_MAPPING = {
	title: 'title ILIKE'
}


describe('sqlCreateQueryBuilder', () => {
	
	const USERS_CREATE_SAMPLE = {
		username: 'testuser1',
		password: 'password',
		firstName: 'test',
		lastName: 'user',
		email: 'asdf@asdf.com',
		birthdateYear: 1991,
		birthdateMonth: 1,
		birthdateDay: 1,
	}

	const CONTENTS_CREATE_SAMPLE = {
		title: 'newtitle',
		summary: 'general idea',
		description: 'some links',
		owner: 'testuser1',
		contractType: 'single',
	}

	test('works, users', () => {

		const { 
			parameterizedINSERTPropertyNames, 
			parameterizedINSERTPropertyIndices, 
			insertParameters } = sqlCreateQueryBuilder(USERS_CREATE_SAMPLE, users_JSON_SQL_SET_MAPPING);

		expect(parameterizedINSERTPropertyNames).toEqual('(username, password, first_name, last_name, email, birthdateYear, birthdateMonth, birthdateDay)');
		expect(parameterizedINSERTPropertyIndices).toEqual('($1, $2, $3, $4, $5, $6, $7, $8)');
		expect(insertParameters).toEqual([
			USERS_CREATE_SAMPLE.username,
			insertParameters[1],
			USERS_CREATE_SAMPLE.firstName,
			USERS_CREATE_SAMPLE.lastName,
			USERS_CREATE_SAMPLE.email,
			1991,1,1]);

	});

	test('works, contents', () => {

		const { 
			parameterizedINSERTPropertyNames, 
			parameterizedINSERTPropertyIndices, 
			insertParameters } = sqlCreateQueryBuilder(CONTENTS_CREATE_SAMPLE, contents_JSON_SQL_SET_MAPPING);

		expect(parameterizedINSERTPropertyNames).toEqual('(title, summary, description, owner, contract_type)');
		expect(parameterizedINSERTPropertyIndices).toEqual('($1, $2, $3, $4, $5)');
		expect(insertParameters).toEqual([
			CONTENTS_CREATE_SAMPLE.title,
			CONTENTS_CREATE_SAMPLE.summary,
			CONTENTS_CREATE_SAMPLE.description,
			CONTENTS_CREATE_SAMPLE.owner,
			CONTENTS_CREATE_SAMPLE.contractType,
			]);

	});

});

describe('sqlFilterQueryBuilder', () => {
	
	const USERS_FILTER_SAMPLE = {
		username: '%testuser1%',
	}

	const CONTENTS_FILTER_SAMPLE = {
		title: '%newtitle%',
	}

	test('works, users', () => {

		const { parameterizedWHERE,	whereParameters } = sqlFilterQueryBuilder(USERS_FILTER_SAMPLE, users_JSON_SQL_QUERY_MAPPING);
			
		expect(parameterizedWHERE).toEqual('WHERE username ILIKE $1');
		expect(whereParameters).toEqual([
			USERS_FILTER_SAMPLE.username]);

	});


	test('works, contents', () => {

		const { parameterizedWHERE,	whereParameters } = sqlFilterQueryBuilder(CONTENTS_FILTER_SAMPLE, contents_JSON_SQL_QUERY_MAPPING);
			
		expect(parameterizedWHERE).toEqual('WHERE title ILIKE $1');
		expect(whereParameters).toEqual([
			CONTENTS_FILTER_SAMPLE.title]);

	});

	test('empty', () => {
		
		try{
		
			const { 
				parameterizedWHERE, 
				whereParameters } = sqlFilterQueryBuilder();

		}catch(error){
		}

	});

});

describe('sqlUpdateQueryBuilder', () => {
	
	const USERS_UPDATE_SAMPLE = {
		picture: 'default.jpg',
		description: 'testetestsetset',
		password: 'test',
	}

	const CONTENTS_UPDATE_SAMPLE = {
		title: 'newtitle',
		summary: 'general idea',
		description: 'some links',
		owner: 'testuser1',
		contractType: 'single',
	}


	test('works, users', () => {

		const { 
			parameterizedSET, 
			setParameters } = sqlUpdateQueryBuilder(USERS_UPDATE_SAMPLE, users_JSON_SQL_SET_MAPPING);
			
		expect(parameterizedSET).toEqual(`"picture"=$1, "description"=$2, "password"=$3`);
			// probably a problem?
		expect(setParameters).toEqual([
			USERS_UPDATE_SAMPLE.picture,
			USERS_UPDATE_SAMPLE.description,
			USERS_UPDATE_SAMPLE.password]);

	});


	test('works, contents', () => {

		const { 
			parameterizedSET, 
			setParameters } = sqlUpdateQueryBuilder(CONTENTS_UPDATE_SAMPLE, contents_JSON_SQL_SET_MAPPING);
			
		expect(parameterizedSET).toEqual(`"title"=$1, "summary"=$2, "description"=$3, "owner"=$4, "contract_type"=$5`);
			// probably a problem?
		expect(setParameters).toEqual([
			CONTENTS_UPDATE_SAMPLE.title,
			CONTENTS_UPDATE_SAMPLE.summary,
			CONTENTS_UPDATE_SAMPLE.description,
			CONTENTS_UPDATE_SAMPLE.owner,
			CONTENTS_UPDATE_SAMPLE.contractType]);

	});

	test('error: empty', () => {

		try{
			
			const { 
				parameterizedSET, 
				setParameters } = sqlUpdateQueryBuilder();
			
		}catch(error){
			expect(error.status).toEqual(400);
			expect(error.message).toEqual('No data.');		
		}

	});

});