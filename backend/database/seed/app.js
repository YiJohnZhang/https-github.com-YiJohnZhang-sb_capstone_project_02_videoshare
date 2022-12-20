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
	outputFileName: 'seed.sql'

}

//	LIBRARIES & MODULES
const fs = require('fs');
const csvParser = require('csv-parser');
const { writer } = require('repl');

//	GLOBAL VARIABLES
let relationsHeader = {};
let relationsData = {};
let trolololAsyncCounter = 0;
	// seriously, I am really tired right now.

function trolololAsync(){

	if(trolololAsyncCounter !== config.relationNames.length - 1){
		trolololAsyncCounter = trolololAsyncCounter + 1;
		return;
	}

	const writerStream = fs.createWriteStream(`${config.outputFileName}`/*, {flags: 'a'}*/);
	
	writerStream.write(`--	SETUP\nDROP DATABASE IF EXISTS ${config.databaseName};\nCREATE_DATABASE ${config.databaseName};\n\\c ${config.databaseName};\n\n`);
	
	let droptablesString = 'DROP TABLE IF EXISTS ';
	for(let relationIndex in config.relationNames){

		droptablesString = droptablesString.concat(`${config.relationNames[config.relationNames.length - 1 - relationIndex]}, `);

	}
	droptablesString = droptablesString.substring(0, droptablesString.length - 2).concat(';');
		// rm ', ' artifact
	writerStream.write(droptablesString);

	writerStream.write('\n\n\n');
	//	DATABASE RELATIONS
	writerStream.write('-- DATABASE RELATIONS\n')
	for (let relationName of config.relationNames){
	
		writerStream.write(`--\t${relationName}\nCREATE TABLE ${relationName} (\n\n\t--properties\n\n);`);
		writerStream.write('\n\n');
	
	}
	
	writerStream.write('\n');
	//	DATABASE SEEDING
	writerStream.write('--	DATABASE SEEDING\n')
	for (let relationName of config.relationNames){

		const newHeaders = relationsHeader[relationName][0].filter((element) => element !== 'id');
			// remove 'id' attributes that are `SERIAL`sql
	
		writerStream.write(`INSERT INTO ${relationName}(`);
		writerStream.write(`${newHeaders}`)
		// column name(s)
		// for(let __ of .split(','))
		writerStream.write(`)\n\tVALUES`);
		// value(s)
		writerStream.write(`\n\t`);

		// 	const {...spreadedRelationsData} = relationsData[relationName];
			// 	interesting to note that this assigns "[NUMBER]" keys to each entry...
		// console.log(relationsData[relationName]);
		
		for(let record of relationsData[relationName]){
			
			if(record.id)
				delete record.id;

			let stringifiedRecord = '';

			for(let entry of Object.values(record)){
				stringifiedRecord = stringifiedRecord.concat(`${entry}, `);
			}

			stringifiedRecord = stringifiedRecord.substring(0,stringifiedRecord.length-2);
				// remove trailing comma and space.
			writerStream.write(`(${stringifiedRecord}),\n\t`)
			
		}
		
		writerStream.write('\n');
	
	}

}

async function readCSVs(){

	for (let relationName of config.relationNames){

		relationsHeader[relationName] = [];
		relationsData[relationName] = [];

		fs.createReadStream(`seed_${relationName}.csv`)
			.pipe(csvParser())
			.on('headers', (header) => relationsHeader[relationName].push(header))
			.on('data', (data) => relationsData[relationName].push(data))
			.on('close', () => trolololAsync());

	}

}

readCSVs();