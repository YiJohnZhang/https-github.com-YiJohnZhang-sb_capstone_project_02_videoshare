
//	CONFIGURATION VARIABLES
const config = {

	databaseName: 'sb_50_capstone_project_shortcollabs',
	relationNames: [
		'users',
		'contents',
		'roles',
		'contents_users_join',
		'roles_users_join'
	],
	fileName: 'seed.sql'

}

//	LIBRAR(IES)
const fs = require('fs');
const csvParser = require('csv-parser');
let records = [];

fs.createReadStream('seed_contents.csv')
	.pipe(csvParser())
	.on('data', (data) => records.push(data))
	.on('end', () => console.log(records));

// const writeStream = fs.createWriteStream('seed.sql');

// writeStream.once('open', )




// // SETUP DATABASE
// (`--	SETUP\n\n
// DROP DATABASE IF EXISTS ${config.databaseName};
// CREATE_DATABASE ${config.databaseName};
// \c ${database_name};`);

// ('\n\n');
// //	DATABASE RELATIONS
// ('-- DATABASE RELATIONS\n\n')
// for (let relationName of config.relationNames){

// 	(`--\t${relationName}\nCREATE TABLE ${relationName} (\n\n\t--properties\n\n);`);
// 	('\n');

// }

// ('\n\n');
// //	DATABASE SEEDING
// ('--	DATABASE SEEDING\n\n')
// for (let relationName of config.relationNames){

// 	(`INSERT INTO ${relationName} (`);
// 	// column name(s)
// 	for(let __ of .split(','))
// 	(`)\n\tVALUES`);
// 	// value(s)
// 	(`\n\t(`);
// 	('\n');

// }