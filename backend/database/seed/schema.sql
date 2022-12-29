DROP TABLE IF EXISTS roles_users_join, contents_users_join, roles, contents, users;-- DATABASE RELATIONS
-- DATABASE RELATIONS
--	users
CREATE TYPE account_status AS ENUM ('standby', 'active', 'banned', 'suspended');
	-- default is 'standby', 'active', 'banned', 'suspended'

CREATE TABLE users (

	username VARCHAR(32) PRIMARY KEY,
		-- SQL defines two primary character types: character varying(n) and character(n), where n is a positive integer... If the string to be stored is shorter than the declared length, values of type character (`CHARACTER(n)` or `CHAR(n)`) will be space-padded; values of type character varying (`CHARACTER VARYING(n)` or `VARCHAR(n)`) will simply store the shorter string.
			-- https://www.postgresql.org/docs/8.4/datatype-character.html
	first_name VARCHAR(32) NOT NULL,
	last_name VARCHAR(32) NOT NULL,
	birthdate DATE NOT NULL,
	-- parental_controls
		-- not implemented but to set verified parent / guardian as a "manager" for the child
	verified BOOLEAN DEFAULT FALSE,
		-- default false
	-- default 'standby'; 'active', 'banned', or 'suspended'
	account_status account_status DEFAULT 'standby',
	-- extra: basically it lets admin panel sort through which accounts to delete or lift the ban
	email VARCHAR(100) NOT NULL
    	CHECK (position('@' IN email) > 1),
		-- < 100
	"password" TEXT NOT NULL,
	picture VARCHAR(64) DEFAULT 'default.jpg',
		-- default default.jpg
	"description" VARCHAR(512) NOT NULL,
		-- LEN <= 512 in client-side, server-side validation; also database
	is_elevated BOOLEAN DEFAULT FALSE
		-- reminder: block a request body from containing this attribute

);

--	contents
CREATE TYPE status_state AS ENUM ('open', 'standby', 'active', 'legacy');
	-- default is 'open'
CREATE TYPE contract_type_state AS ENUM ('solo', 'byview', 'presplit');
	-- default is 'single'

CREATE TABLE contents (
	id					SERIAL PRIMARY KEY,
	title				VARcHAR(64) NOT NULL,
	summary				VARCHAR(512) NOT NULL,
	"description"		VARCHAR(2200)
		DEFAULT 'Description placeholder.',
		-- https://mashable.com/article/tiktok-video-descriptions-photo-mode
	link				VARCHAR(100),
	-- bloopers
	-- notes
	-- visible
	"status"			status_state DEFAULT 'open',
	"owner"				VARCHAR(32)
		REFERENCES users(username) ON DELETE CASCADE,
	contract_type		contract_type_state DEFAULT 'solo',
		-- 2022-12-12 "monetization type"?
	contract_details	TEXT
		DEFAULT '{views:[{username: "temporary", share:1}], engagement:[{username: "temporary", share:1}]}',
	contract_signed		TEXT
		DEFAULT '[{username:"temporary", signed: false}]',
	date_created		DATE NOT NULL, 
	date_standby		DATE,
	date_published		DATE

);

--	roles
CREATE TABLE roles (

	id SMALLSERIAL PRIMARY KEY,
	"name" TEXT NOT NULL

);

--	contents_users_join
CREATE TABLE contents_users_join (

	user_id VARCHAR(32) NOT NULL
		REFERENCES users(username) ON DELETE CASCADE,
	content_id SMALLINT NOT NULL
		REFERENCES contents(id) ON DELETE CASCADE,
	"description" VARCHAR(2200)
		-- by default it inherits the contents `default_description`
		-- each user sets their own content description

);

--	roles_users_join
CREATE TABLE roles_users_join (
	-- user, creator, brand (marketing admin), representative (brand assistant w/ delegated responsibilities), admin (site admin), moderator (admin assistant w/ delegated responsibilties)

	user_id VARCHAR(32) NOT NULL
		REFERENCES users(username),
	role_id SMALLINT NOT NULL
		REFERENCES roles(id)

);