--	DATABASE SEEDING-- understood: `"` is for column names, `'` is for data
	-- boolean: expect: TRUE / FALSE without quotes
	-- date: expect with single-quotes to not be parsed as integers
INSERT INTO users("username","first_name","last_name","birthdate","verified","account_status","email","password","picture","description","is_elevated")
	VALUES
	('tuckerdiane', 'Harold', 'Smith', '1998-10-19', TRUE, 'active', 'ronald38@yahoo.com', '$2a$14$MtrF8MqSh4.DV6rFAYcYouwJSA3q5pJNPTerCfzWJGpVss1/ES4GG', 'xsgamesm-33.jpg', 'Decision professional real each citizen level.', TRUE),
	('edward88', 'Carter', 'Johnson', '2004-3-13', TRUE, 'active', 'richard65@martin.net', '$2a$14$MtrF8MqSh4.DV6rFAYcYouwJSA3q5pJNPTerCfzWJGpVss1/ES4GG', 'xsgamesm-49.jpg', 'Maybe key community young ahead.', TRUE),
	('joanna15', 'Trent', 'Hayes', '1989-10-23', TRUE, 'active', 'helen38@hotmail.com', '$2a$14$MtrF8MqSh4.DV6rFAYcYouwJSA3q5pJNPTerCfzWJGpVss1/ES4GG', 'xsgamesm-23.jpg', 'Hotel together show gas seven.', TRUE),
	('kwilliams', 'Evette', 'Hoskison', '1994-4-13', FALSE, 'active', 'mcdonaldjohn@parks-miller.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesf-48.jpg', 'Cell itself institution couple should.', FALSE),
	('palmermichael', 'Myra', 'Moreaux', '1991-10-24', TRUE, 'active', 'ljohnson@grimes-stevens.net', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesf-38.jpg', 'Concern phone sport whatever professor material.', FALSE),
	('becklinda', 'Concha', 'Artyomova', '2005-8-6', TRUE, 'active', 'angelicaparker@nguyen.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesf-61.jpg', 'Might north station step own wear stay.', FALSE),
	('pattersonangela', 'Terri', 'Kramer', '1999-3-25', TRUE, 'active', 'laura85@barrett-hunter.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesf-31.jpg', 'Resource source beyond beautiful product add mention.', FALSE),
	('crawfordshawn', 'Cindy', 'Rischelaux', '2004-1-4', TRUE, 'active', 'murphyjohn@hernandez-beard.info', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesf-73.jpg', 'Figure seat everybody agency.', FALSE),
	('psampson', 'Lauren', 'Sauer', '1991-8-26', TRUE, 'active', 'bgray@hotmail.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesf-9.jpg', 'Often beyond enough why.', FALSE),
	('wrightgeorge', 'Aileen', 'Jagerson', '1992-5-19', TRUE, 'active', 'tatemallory@sanford-armstrong.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesf-3.jpg', 'Spring language his several drop.', FALSE),
	('webbmark', 'Sheila', 'Nieminen', '2003-5-21', TRUE, 'active', 'lauraconner@hotmail.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesf-56.jpg', 'Term left view.', FALSE),
	('veronicahaynes', 'Leonre', 'Radish', '1991-9-5', TRUE, 'active', 'bookerricky@gmail.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesf-72.jpg', 'Arrive indicate finally.', FALSE),
	('stacymartin', 'Trey', 'Hackwell', '1991-11-9', TRUE, 'active', 'murphytimothy@yahoo.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesm-57.jpg', 'Result team myself western past movie enough.', FALSE),
	('mendozabrian', 'Richard', 'Van Dyke', '1987-6-10', TRUE, 'active', 'timothyritter@gmail.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'default.jpg', 'Start decision go lay.', FALSE),
	('wjefferson', 'Raymond', 'Stanton', '2003-4-8', TRUE, 'active', 'christophersims@castaneda-soto.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesm-69.jpg', 'View beat service history field.', FALSE),
	('kingdonna', 'Erika', 'De Geer', '1996-6-7', TRUE, 'active', 'gcherry@mclaughlin.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesf-46.jpg', 'Ever late future.', FALSE),
	('andersontroy', 'Yuliya', 'Tsvetaeva', '2000-9-22', TRUE, 'active', 'brian35@lopez.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesf-44.jpg', 'Role letter site chair pretty coach.', FALSE),
	('zwilkins', 'Alexandria', 'Austin', '1990-8-8', TRUE, 'active', 'terrydestiny@ramos.net', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesf-43.jpg', 'Form nearly win hit tend society agree.', FALSE),
	('ashley13', 'Sara', 'Pahlavi', '1999-3-15', TRUE, 'active', 'scottlori@hotmail.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesf-34.jpg', 'Book shoulder similar.', FALSE),
	('tiffanywilson', 'Ludmilla', 'Volkova', '2001-11-25', TRUE, 'active', 'hjones@murphy-jacobs.net', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'xsgamesf-11.jpg', 'Late international management bag firm rather particularly.', FALSE),
	('cstpball', 'CSTP', 'Ball', '1990-01-01', TRUE, 'active', 'cstpball@fakeemail.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'cstpball.jpg', 'Record what save plan add keep.', FALSE),
	('icariaball', 'Icaria', 'Ball', '1990-01-01', TRUE, 'active', 'icariaball@fakeemail.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'icariaball.jpg', 'Might north station step own wear stay.', FALSE),
	('tacoboiii', 'Taco', 'Boiii', '1990-01-01', TRUE, 'active', 'tacoboiii@fakeemail.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'tacoboii.jpg', 'Total behavior attention.', FALSE),
	('thatmitchellandwebblook', 'Mitchell', 'Webb', '1990-01-01', TRUE, 'active', 'thatmitchellandwebblook@fakeemail.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'thatmitchandwebblook.jpg', 'Begin money me young science.', FALSE),
	('kaliningradgeneral', 'Kaliningrad', 'General', '1990-01-01', TRUE, 'active', 'kaliningradgeneral@fakeemail.com', '$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K', 'kaliningradgeneral.jpg', 'Treatment better little cover fact commercial.', FALSE);
	
INSERT INTO contents(title,summary,description,link,status,owner,contract_type,contract_details,contract_signed,date_created,date_standby,date_published)
	VALUES
	('Coverage of People Buying a House and Living in It', 'temporary', 'That Mitchell and Webb Look (s1 ep2)\nSource: https://youtu.be/gqK5AYiuC_w', 'gqK5AYiuC_w_360p', 'active', 'thatmitchellandwebblook', 'solo', NULL, NULL, '2022-12-12', '2022-12-26', '2022-12-26'),
	('Talent Dredge', 'temporary', 'Again, one of my favorites from the masters, Mitchell and Webb.\nSource: https://youtu.be/3I5udb-BDAQ', '3I5udb-BDAQ_360p', 'active', 'thatmitchellandwebblook', 'presplit', '{views:[{username: "thatmitchellandwebblook", share:0.7}, {username: "veronicahaynes", share:0.3}], engagement:[{username: "thatmitchellandwebblook", share:0.5}, {username: "veronicahaynes", share:0.5}]}', '[{username: "thatmitchellandwebblook", signed:true}, {username: "veronicahaynes", signed:true}]', '2022-12-12', '2022-12-26', '2022-12-26'),
	('Bronze Orientation', 'temporary', 'Bronze Orientation for stone-age chippers and tie-ers. A sketch from series 2 of That Mitchell and Webb Look.\nSource: https://youtu.be/nyu4u3VZYaQ', 'nyu4u3VZYaQ_360p', 'active', 'thatmitchellandwebblook', 'byview', NULL, '[{username: "thatmitchellandwebblook", signed:true}, {username: "wjefferson", signed:true}]', '2022-12-12', '2022-12-26', '2022-12-26'),
	('Lorem Ipsum', 'marketing campaign for some brand', 'Lorem ispum.', NULL, 'standby', 'veronicahaynes', 'presplit', NULL, NULL, '2022-12-12', '2022-12-26', NULL),
	('Birdie', 'placeholder', 'HYPEEEEEEEEEEEEEEEEEE', NULL, 'open', 'tiffanywilson', 'presplit', NULL, NULL, '2022-12-12', NULL, NULL);
	
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
	('thatmitchellandwebblook', 1, 'That Mitchell and Webb Look (s1 ep2)\nSource: https://youtu.be/gqK5AYiuC_w'),
	('thatmitchellandwebblook', 2, 'Again, one of my favorites from the masters, Mitchell and Webb.\nSource: https://youtu.be/3I5udb-BDAQ'),
	('thatmitchellandwebblook', 3, 'Bronze Orientation for stone-age chippers and tie-ers. A sketch from series 2 of That Mitchell and Webb Look.\nSource: https://youtu.be/');
	
INSERT INTO roles_users_join("user_id","role_id")
	VALUES
	('tuckerdiane', 1),
	('edward88', 1),
	('joanna15', 1),
	('zwilkins', 3);