

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