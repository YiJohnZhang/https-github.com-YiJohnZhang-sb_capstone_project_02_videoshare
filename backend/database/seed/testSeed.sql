--	testSeed.sql
--	SETUP
DROP DATABASE IF EXISTS sb_50_capstone_project_shortcollabs_test;
CREATE DATABASE sb_50_capstone_project_shortcollabs_test;
\c sb_50_capstone_project_shortcollabs_test;

--	SCHEMA
\i schemaSeed.sql

--	SEED DATA
--	\i testContentSeed.sql
INSERT INTO users("username","first_name","last_name","birthdate","verified","account_status","email","password","picture","description","is_elevated")
	VALUES
	('testuser1', 'Test', 'uSER1', '1990-01-01', TRUE, 'active', 'testUser@test.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesm-33.jpg', 'afsd2', FALSE),
	('testuser2', 'Test', 'uSER2', '1990-01-01', TRUE, 'active', 'testUser@test.net', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesm-49.jpg', 'fasd1', FALSE),
	('adminUser1', 'Admin', 'USER1', '1990-10-23', TRUE, 'active', 'admin@amail.com', '$2a$14$MtrF8MqSh4.DV6rFAYcYouwJSA3q5pJNPTerCfzWJGpVss1/ES4GG', 'xsgamesm-23.jpg', 'asdfz', TRUE);

INSERT INTO contents(title,summary,description,link,status,owner,contract_type,participants,contract_details,contract_signed,date_created,date_standby,date_published)
	VALUES
	('tempContent1', 'temporarySummary', 'default_description', 'invalidLink', 'published', 'testuser1', 'solo', '["testuser1"]', '{"views":[{"username":"testuser1","share":1}], "engagement":[{"username":"testuser1","share":1}]}', '["testuser1"]', '2022-12-29', '2022-12-29', '2022-12-30'),
	('tempContent2', 'temporarySummary', 'default_description', 'invalidLink', 'published', 'testuser1', 'byview', '["testuser1","testuser2"]', '{"views":[{"username":"testuser1","share":0}, {"username":"testuser2","share":0}], "engagement":[{"username":"testuser1","share":0}, {"username":"testuser2","share":0}]}', '["testuser1","testuser2"]', '2022-12-29', '2022-12-29', '2022-12-30'),
	('tempContent3', 'temporarySummary', 'default_description', 'invalidLink', 'open', 'testuser1', 'presplit', '["testuser1","testuser2"]', '{"views":[{"username":"testuser1","share":0.7}, {"username":"testuser2","share":0.3}], "engagement":[{"username":"testuser1","share":0.4}, {"username":"testuser2","share":0.6}]}', '["testuser1"]', '2022-12-30', '2022-12-30', NULL);

INSERT INTO roles(name)
	VALUES
	('Administrator'),
	('Creator'),
	('Brand'),
	('empty_1'),
	('empty_2'),
	('empty_3'),
	('empty_4'),
	('empty_5'),
	('empty_6'),
	('empty_7'),
	('Moderator'),
	('Brand Representative'),
	('empty_8'),
	('empty_9'),
	('empty_10'),
	('empty_11'),
	('empty_12'),
	('empty_13'),
	('empty_14'),
	('empty_15');
	
INSERT INTO contents_users_join(user_id,content_id,description)
	VALUES
	('testuser1', 1, ''),
	('testuser1', 2, ''),
	('testuser2', 2, ''),
	('testuser1', 3, ''),
	('testuser2', 3, '');
	
INSERT INTO roles_users_join("user_id","role_id")
	VALUES
	('adminUser1', 1);
