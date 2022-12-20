/**	Application confguration variables.
	*/

require('dotenv').config();	// read .env files and make environmental variables

const DB_URI = (process.env.NODE_ENV === "test")
	? "postgresql:///sb_c02_shortcollabs_test"
	: "postgresql:///sb_c02_shortcollabs";

const PORT_NUMBER = 3000;	//process.env it later

const BCRYPT_WORK_FACTOR = 14;
	// subject to update

const JWT_SECRET_KEY = process.env.SECRET_KEY || "test_secret key";

module.exports = {
	DB_URI,
	PORT_NUMBER,
	JWT_SECRET_KEY,
	BCRYPT_WORK_FACTOR
};