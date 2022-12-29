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
	baseSeedFileName: 'baseSeed.sql',
	tableOutputFileName: 'schemaSeed.sql',
	seedOutputFileName: 'contentSeed.sql'

}

//	LIBRARIES & MODULES
const fs = require('fs');
const csvParser = require('csv-parser');

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

	const writerStreamBaseFile = fs.createWriteStream(`${config.baseSeedFileName}`/*, {flags: 'a'}*/);
	writerStreamBaseFile.write(`--	SETUP\nDROP DATABASE IF EXISTS ${config.databaseName};\nCREATE DATABASE ${config.databaseName};\n\\c ${config.databaseName};\n\n`);
	
	writerStreamBaseFile.write(`\n\\i ${config.tableOutputFileName}\n\\i ${config.seedOutputFileName}`)
	
	writerStreamBaseFile.end();
	// writerStreamBaseFile.write('\n\n\n');

	const writerStreamTableFile = fs.createWriteStream(`${config.tableOutputFileName}`/*, {flags: 'a'}*/);
	let dropRelationsString = 'DROP TABLE IF EXISTS ';

	for(let relationIndex in config.relationNames){

		dropRelationsString = dropRelationsString.concat(`${config.relationNames[config.relationNames.length - 1 - relationIndex]}, `);

	}
	dropRelationsString = dropRelationsString.substring(0, dropRelationsString.length - 2).concat(';');
		// rm ', ' artifact
	writerStreamTableFile.write(dropRelationsString);
	
	//	DATABASE RELATIONS
	writerStreamTableFile.write('-- DATABASE RELATIONS\n');
	for (let relationName of config.relationNames){
	
		writerStreamTableFile.write(`--\t${relationName}\nCREATE TABLE ${relationName} (\n\n\t--properties\n\n);`);
		writerStreamTableFile.write('\n\n');
	
	}
	
	// writerStreamTableFile.write('\n');
	writerStreamTableFile.end();

	//	DATABASE SEEDING
	const writerStreamSeedFile = fs.createWriteStream(`${config.seedOutputFileName}`);
	writerStreamSeedFile.write('--	DATABASE SEEDING');
	writerStreamSeedFile.write(`-- understood: \`"\` is for column names, \`'\` is for data\n\t-- boolean: expect: TRUE / FALSE without quotes\n\t-- date: expect with single-quotes to not be parsed as integers\n`);

	for (let relationName of config.relationNames){

		const newHeaders = relationsHeader[relationName][0].filter((element) => element !== 'id');
			// remove 'id' attributes that are `SERIAL`sql
	
		writerStreamSeedFile.write(`INSERT INTO ${relationName}(`);
		writerStreamSeedFile.write(`${newHeaders}`)
		// column name(s)
		// for(let __ of .split(','))
		writerStreamSeedFile.write(`)\n\tVALUES`);
		// value(s)
		writerStreamSeedFile.write(`\n\t`);

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
			writerStreamSeedFile.write(`(${stringifiedRecord}),\n\t`);
			
		}
		
		writerStreamSeedFile.write('\n');
	
	}

	writerStreamSeedFile.end();

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