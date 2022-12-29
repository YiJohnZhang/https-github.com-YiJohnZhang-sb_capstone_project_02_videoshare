/**	Application confguration variables.
	*/

require('dotenv').config();	// read .env files and make environmental variables

const DB_URI = (process.env.NODE_ENV === "test")
	? "postgresql:///sb_50_capstone_project_shortcollabs_test"
	: process.env.DATABASE_URL || "postgresql:///sb_50_capstone_project_shortcollabs";

const PORT_NUMBER = process.env.PORT || 3000;

const BCRYPT_WORK_FACTOR = (process.env.NODE_ENV === "test") ? 1 : 14;
	// speed up tests

const JWT_SECRET_KEY = process.env.SECRET_KEY || "test_secret key";

module.exports = {
	DB_URI,
	PORT_NUMBER,
	JWT_SECRET_KEY,
	BCRYPT_WORK_FACTOR
};