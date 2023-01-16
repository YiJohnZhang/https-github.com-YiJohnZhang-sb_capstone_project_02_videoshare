--	DATABASE SEEDING-- understood: `"` is for column names, `'` is for data
	-- boolean: expect: TRUE / FALSE without quotes
	-- date: expect with single-quotes to not be parsed as integers
INSERT INTO users("username","first_name","last_name","birthdate","verified","account_status","email","password","picture","description","is_elevated")
	VALUES
	('tuckerdiane','Harold','Smith','1998-10-19',TRUE,'active','ronald38@yahoo.com','$2a$14$MtrF8MqSh4.DV6rFAYcYouwJSA3q5pJNPTerCfzWJGpVss1/ES4GG','xsgamesm-33.jpg','Decision professional real each citizen level.',TRUE),
	('edward88','Carter','Johnson','2004-3-13',TRUE,'active','richard65@martin.net','$2a$14$MtrF8MqSh4.DV6rFAYcYouwJSA3q5pJNPTerCfzWJGpVss1/ES4GG','xsgamesm-49.jpg','Maybe key community young ahead.',TRUE),
	('shawn89','Trent','Hayes','1989-10-23',TRUE,'active','helen38@hotmail.com','$2a$14$MtrF8MqSh4.DV6rFAYcYouwJSA3q5pJNPTerCfzWJGpVss1/ES4GG','xsgamesm-23.jpg','Hotel together show gas seven.',TRUE),
	('kwilliams','Evette','Hoskison','1994-4-13',FALSE,'active','mcdonaldjohn@parks-miller.com','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','xsgamesf-48.jpg','Cell itself institution couple should.',FALSE),
	('palmermichael','Myra','Moreaux','1991-10-24',TRUE,'active','ljohnson@grimes-stevens.net','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','xsgamesf-72.jpg','Concern phone sport whatever professor material.',FALSE),
	('becklinda','Concha','Artyomova','2005-8-6',TRUE,'active','angelicaparker@nguyen.com','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','xsgamesf-61.jpg','Might north station step own wear stay.',FALSE),
	('pattersonangela','Terri','Kramer','1999-3-25',TRUE,'active','laura85@barrett-hunter.com','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','xsgamesf-31.jpg','Resource source beyond beautiful product add mention.',FALSE),
	('crawfordshawn','Cindy','Rischelaux','2004-1-4',TRUE,'active','murphyjohn@hernandez-beard.info','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','xsgamesf-73.jpg','Figure seat everybody agency.',FALSE),
	('psampson','Lauren','Sauer','1991-8-26',TRUE,'active','bgray@hotmail.com','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','xsgamesf-9.jpg','Often beyond enough why.',FALSE),
	('wrightgeorge','Aileen','Jagerson','1992-5-19',TRUE,'active','tatemallory@sanford-armstrong.com','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','xsgamesf-3.jpg','Spring language his several drop.',FALSE),
	('webbmark','Sheila','Nieminen','2003-5-21',TRUE,'active','lauraconner@hotmail.com','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','xsgamesf-56.jpg','Term left view.',FALSE),
	('veronicahaynes','Leonre','Radish','1991-9-5',TRUE,'active','bookerricky@gmail.com','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','xsgamesf-38.jpg','Arrive indicate finally.',FALSE),
	('stacymartin','Trey','Hackwell','1991-11-9',TRUE,'active','murphytimothy@yahoo.com','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','xsgamesm-57.jpg','Result team myself western past movie enough.',FALSE),
	('mendozabrian','Richard','Van Dyke','1987-6-10',TRUE,'active','timothyritter@gmail.com','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','default.jpg','Start decision go lay.',FALSE),
	('wjefferson','Jaroslav','Beck','2003-4-8',TRUE,'active','christophersims@castaneda-soto.com','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','xsgamesm-69.jpg','Everyone step to the right.',FALSE),
	('kingdonna','Erika','De Geer','1996-6-7',TRUE,'active','gcherry@mclaughlin.com','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','xsgamesf-46.jpg','Ever late future.',FALSE),
	('andersontroy','Yuliya','Tsvetaeva','2000-9-22',TRUE,'active','brian35@lopez.com','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','xsgamesf-44.jpg','Role letter site chair pretty coach.',FALSE),
	('zwilkins','Alexandria','Austin','1990-8-8',TRUE,'active','terrydestiny@ramos.net','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','xsgamesf-43.jpg','Form nearly win hit tend society agree.',FALSE),
	('ashley13','Sara','Pahlavi','1999-3-15',TRUE,'active','scottlori@hotmail.com','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','xsgamesf-34.jpg','Book shoulder similar.',FALSE),
	('tiffanywilson','Ludmilla','Volkova','2001-11-25',TRUE,'active','hjones@murphy-jacobs.net','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','xsgamesf-11.jpg','Late international management bag firm rather particularly.',FALSE),
	('thatmitchellandwebblook','Mitchell','Webb','1990-01-01',TRUE,'active','thatmitchellandwebblook@fakeemail.com','$2a$14$3QlPlVm0blm4M5sLgUmcc.ii6DLtVW6S6AOWRn3rWNZhwBVsWzq/K','thatmitchandwebblook.jpg','Begin money me young science.',FALSE);
	
INSERT INTO contents(title,summary,description,link,status,owner,contract_type,participants,contract_details,contract_signed,date_created,date_standby,date_published)
	VALUES
	('Coverage of People Buying a House and Living in It','m&w1','That Mitchell and Webb Look (s1 ep2)','gqK5AYiuC_w','legacy','thatmitchellandwebblook','solo','["thatmitchellandwebblook"]','{views:[{username: "thatmitchellandwebblook", share:1}], engagement:[{username: "thatmitchellandwebblook", share:1}]}','["thatmitchellandwebblook"]','2022-12-12','2022-12-26','2022-12-26'),
	('Talent Dredge','m&w2','Again, one of my favorites from the masters, Mitchell and Webb.','3I5udb-BDAQ','published','thatmitchellandwebblook','presplit','["thatmitchellandwebblook", "veronicahaynes"]','{views:[{username: "thatmitchellandwebblook", share:0.7}, {username: "veronicahaynes", share:0.3}], engagement:[{username: "thatmitchellandwebblook", share:0.5}, {username: "veronicahaynes", share:0.5}]}','["thatmitchellandwebblook", "veronicahaynes"]','2022-12-12','2022-12-26','2022-12-27'),
	('Bronze Orientation','m&w3','Bronze Orientation for stone-age chippers and tie-ers. A sketch from series 2 of That Mitchell and Webb Look.','nyu4u3VZYaQ','published','thatmitchellandwebblook','byview','["thatmitchellandwebblook", "wjefferson"]','{views:[{username: "thatmitchellandwebblook", share:1}, {username: "wjefferson", share:1}], engagement:[{username: "thatmitchellandwebblook", share:1}, {username: "wjefferson", share:1}]}','["thatmitchellandwebblook", "wjefferson"]','2022-12-12','2022-12-26','2022-12-27'),
	('Lorem Ipsum','placeh0lder','Lorem ispum.',NULL,'standby','veronicahaynes','presplit','["veronicahaynes"]','{views:[{username: "veronicahaynes", share:1}], engagement:[{username: "veronicahaynes", share:1}]}','["veronicahaynes"]','2022-12-12','2022-12-26',NULL),
	('Birdie','placeholder','Ispum et Dolor.',NULL,'open','tiffanywilson','presplit','["tiffanywilson"]','{views:[{username: "tiffanywilson", share:1}], engagement:[{username: "tiffanywilson", share:1}]}','["tiffanywilson"]','2022-12-12',NULL,NULL),
	('British Actors','sherlock holmes & watson','That Mitchell and Webb Look, Sherlock Holmes','MQEKWUJIqYw','standby','thatmitchellandwebblook','solo','["thatmitchellandwebblook"]','{views:[{username: "thatmitchellandwebblook", share:1}], engagement:[{username: "thatmitchellandwebblook", share:1}]}','["thatmitchellandwebblook"]','2022-12-13','2022-12-23',NULL),
	('Fitbeat','gotta stay fit','"Fitbeat" for Beat Saber. By Jaroslav Beck, a Czech EDM artist.','_AF3L2-ratI','legacy','wjefferson','presplit','["wjefferson", "becklinda"]','{views:[{username: "wjefferson", share:0.7}, {username: "becklinda", share:0.3}], engagement:[{username: "wjefferson", share:0.25}, {username: "becklinda", share:0.75}]}','["wjefferson", "becklinda"]','2022-12-13','2022-12-26','2022-12-26'),
	('Jetpacks','jetpack sketch','jetpack','oKVbCHxstdo','published','thatmitchellandwebblook','presplit','["thatmitchellandwebblook", "wjefferson", "shawn89", "tiffanywilson", "stacymartin", "kwilliams", "webbmark"]','{views:[{username: "thatmitchellandwebblook", share:0.4}, {username: "wjefferson", share:0.1}, {username: "shawn89", share:0.1}, {username: "tiffanywilson", share:0.1}, {username: "stacymartin", share:0.1}, {username: "kwilliams", share:0.1}, {username: "webbmark", share:0.1}], engagement:[{username: "thatmitchellandwebblook", share:0.4}, {username: "wjefferson", share:0.1}, {username: "shawn89", share:0.1}, {username: "tiffanywilson", share:0.1}, {username: "stacymartin", share:0.1}, {username: "kwilliams", share:0.1}, {username: "webbmark", share:0.1}]}','["thatmitchellandwebblook", "wjefferson", "shawn89", "tiffanywilson", "stacymartin", "kwilliams", "webbmark"]','2022-12-14','2022-12-27','2023-01-14'),
	('Spooky Beat','Halloween-themed beat saber','"Spooky Beat" for Beat Saber. By Jaroslav Beck, a Czech EDM artist.','zYpeTxUgmLg','published','wjefferson','solo','["wjefferson"]','{views:[{username: "wjefferson", share:1}], engagement:[{username: "wjefferson", share:1}]}','["wjefferson"]','2022-12-17','2023-12-31','2023-01-10'),
	('Ludicrous','gotta go fast for another one for beatsaber','"Ludicrous" for Beat Saber. By Jaroslav Beck, a Czech EDM artist.','WyQ7RRHongI','published','wjefferson','byview','["wjefferson", "shawn89", "psampson"]','{views:[{username: "thatmitchellandwebblook", share:1}, {username: "shawn89", share:1}, {username: "psampson", share:1}], engagement:[{username: "thatmitchellandwebblook", share:1}, {username: "shawn89", share:1}, {username: "psampson", share:1}]}','["wjefferson", "shawn89", "psampson"]','2022-12-18','2023-12-31','2023-01-10'),
	('Cazzette - Weapon (Vicetone Remix)','a remix','"Weapon" by Cazzette, a Swedish EDM Duo, Remixed by Vicetone, a Dutch EDM Duo.','tckmAl_P8dg','published','shawn89','presplit','["shawn89", "andersontroy"]','{views:[{username: "shawn89", share:0.9}, {username: "andersontroy", share:0.1}], engagement:[{username: "shawn89", share:0.4}, {username: "andersontroy", share:0.6}]}','["shawn89", "andersontroy"]','2022-12-19','2023-12-31','2023-01-10');
	
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
	('thatmitchellandwebblook',1,'That Mitchell and Webb Look (s1 ep2)'),
	('thatmitchellandwebblook',2,'Again, one of my favorites from the masters, Mitchell and Webb.'),
	('veronicahaynes',2,'ft. me'),
	('thatmitchellandwebblook',3,'Bronze Orientation for stone-age chippers and tie-ers. A sketch from series 2 of That Mitchell and Webb Look.'),
	('wjefferson',3,'2nd instance of above'),
	('veronicahaynes',4,NULL),
	('tiffanywilson',5,NULL),
	('thatmitchellandwebblook',6,'That Mitchell and Webb Look, Sherlock Holmes'),
	('wjefferson',7,'"Fitbeat" for Beat Saber. By Jaroslav Beck, a Czech EDM artist.'),
	('becklinda',7,'"Fitbeat" for Beat Saber. By Jaroslav Beck, a Czech EDM artist.'),
	('thatmitchellandwebblook',8,'jetpacks entry 1 test by thatmitchellandwebblook'),
	('wjefferson',8,'jetpacks entry 2 test by wjefferson'),
	('shawn89',8,'jetpacks entry 3 test by shawn89'),
	('tiffanywilson',8,'jetpacks entry 4 test by tiffanywilson'),
	('stacymartin',8,'jetpacks entry 5 test by stacymartin'),
	('wjefferson',9,'"Spooky Beat" for Beat Saber. By Jaroslav Beck, a Czech EDM artist.'),
	('wjefferson',10,'i am spid.'),
	('shawn89',10,'"LUDICROUS+" for Beat Saber. By Jaroslav Beck, a Czech EDM artist.'),
	('psampson',10,'"LUDICROUS+" for Beat Saber. By Jaroslav Beck, a Czech EDM artist.'),
	('shawn89',11,'"Weapon" by Cazzette, a Swedish EDM Duo, Remixed by Vicetone, a Dutch EDM Duo.'),
	('andersontroy',11,'"Weapon" by Cazzette, a Swedish EDM Duo, Remixed by Vicetone, a Dutch EDM Duo.'),
	('kwilliams',8,'jetpacks entry 6 test by kwilliams'),
	('webbmark',8,'jetpacks entry 7 test by webbmark');
	
INSERT INTO roles_users_join("user_id","role_id")
	VALUES
	('tuckerdiane',1),
	('edward88',1),
	('shawn89',1),
	('zwilkins',3);