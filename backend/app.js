/**	The application.
	*/

//  Framework(s) & Librar(ies)
//  ==========================
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

//  Module(s)
//  =========
const { authenticateJWT } = require('./modules/middlewareAAE');
const { RESPONSE_MESSAGE_MAPPING, NotFoundError } = require('./modules/utilities');

const routerAuthentication = require('./modules/routerAuthentication');
const routerUsers = require('./modules/routerUsers');
const routerContents = require('./modules/routerContents');
const routerContentsUsersJoin = require('./modules/routerContentUserJoin');

//  Settings & Before Middleware
//  ============================
app.use(cors());								
app.use(express.json());						
app.use(authenticateJWT);							
app.use(morgan('dev'));								
app.use(express.urlencoded({extended:true}));	

//  Routing
//  =======
app.use('/authentication', routerAuthentication);
app.use('/users', routerUsers);
app.use('/contents', routerContents);
app.use('/cujoin', routerContentsUsersJoin)

// 404 Route Not Found
app.use((req, res, nxt) => {
	return nxt(new NotFoundError);
});

// Generic Error Handler
app.use((err, req, res, nxt) => {

	const ERROR_CODE = err.status || 500;

	return res
		.status(ERROR_CODE)
		.send(RESPONSE_MESSAGE_MAPPING[ERROR_CODE].message);

});

module.exports = app;