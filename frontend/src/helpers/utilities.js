const RESPONSE_MESSAGE_MAPPING = {
	// A map of error codes with pre-written general messages.
	400: {message: '400: bad request'},
	403: {message: '403: forbidden'}, 
	404: {message: '404: not found'},
	'404graceful': {message: 'Resource not found.'},
	409: {message: '409: conflict'},
	'409alreadyExists': {message: 'Resource already exists.'},
	'200deleted': {message: 'deleted'},
	// ...etc. to not memorize the object; maybe just import it FROM APP
};

class ExpressError extends Error {
	// An extension of the JavaScript `Error` class that has `status` and `message` properties that error-listening `Express.js` middleware will catch.

	constructor(status, message=undefined){

		super();

		if(message === undefined){
			this.status = Number(String(status).substring(0, 3));
			this.message = RESPONSE_MESSAGE_MAPPING[status].message;
		}else{
			this.status = status;
			this.message = message;
		}
		
	}

}

// export default;

export {
	ExpressError
};