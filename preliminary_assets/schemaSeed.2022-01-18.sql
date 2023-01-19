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
	"description" VARCHAR(512) DEFAULT '',
		-- LEN <= 512 in client-side, server-side validation; also database
	is_elevated BOOLEAN DEFAULT FALSE,
		-- reminder: block a request body from containing this attribute
	UNIQUE (email)

);

--	contents
CREATE TYPE status_state AS ENUM ('open', 'standby', 'published', 'legacy');
	-- default is 'open'
	-- `published` and `legacy` => JOIN is active
CREATE TYPE contract_type_state AS ENUM ('solo', 'byview', 'presplit');
	-- default is 'solo'

CREATE TABLE contents (
	id					SERIAL PRIMARY KEY,
	title				VARcHAR(64) NOT NULL,
	summary				VARCHAR(512) DEFAULT '',
	"description"		VARCHAR(2200) DEFAULT '',
		-- https://mashable.com/article/tiktok-video-descriptions-photo-mode
	link				VARCHAR(100) DEFAULT '',
	-- bloopers
	-- notes
	-- visible
	"status"			status_state DEFAULT 'open',
	"owner"				VARCHAR(32)
		REFERENCES users(username) ON DELETE CASCADE,
	participants		TEXT,
		-- DEFAULT '["username",...]'	
			-- use JSON.parse to get the object; and JSON.stringify to store in db
	contract_type		contract_type_state DEFAULT 'solo',
		-- 2022-12-12 "monetization type"?
		-- business logic: `solo` sets `participants`, `contract_details`, `contract_signed` to NULL on submission (basically sends NULL to `db`)
	contract_details	TEXT,
		-- DEFAULT '{"views":[{"username": "temporary", share:1}], "engagement":[{"username": "temporary", "share":1}]}',
			-- use JSON.parse to get the object; and JSON.stringify to store in db
	contract_signed		TEXT DEFAULT '[]',
		-- pre-2022-12-28: DEFAULT '[{username:"temporary", signed: false}, ...]',
		-- 2022-12-30: DEFAULT '["username",...]'
			-- use JSON.parse to get the object; and JSON.stringify to store in db
	date_created		DATE
		DEFAULT CURRENT_DATE,
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

	user_id			VARCHAR(32) NOT NULL
		REFERENCES users(username) ON DELETE CASCADE,
	content_id		SMALLINT NOT NULL
		REFERENCES contents(id) ON DELETE CASCADE,
	"description"	VARCHAR(2200),
		-- by default it inherits the contents `description`
		-- each user sets their own content description
	PRIMARY KEY (user_id, content_id)

);

--	roles_users_join
CREATE TABLE roles_users_join (
	-- user, creator, brand (marketing admin), representative (brand assistant w/ delegated responsibilities), admin (site admin), moderator (admin assistant w/ delegated responsibilties)

	user_id VARCHAR(32) NOT NULL
		REFERENCES users(username) ON DELETE CASCADE,
	role_id SMALLINT NOT NULL
		REFERENCES roles(id),
	PRIMARY KEY (user_id, role_id)

);