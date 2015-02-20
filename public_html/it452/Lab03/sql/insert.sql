-- Author: Kawika Barabin
-- Adding test items into the database

-- Kawika (1)
INSERT INTO user (email, password, fname) 
VALUES ('kawikabarabin@me.com', 'DEstroyer20!%', 'Kawika');

INSERT INTO item (user_id, item_name, price, description)
	VALUES (1, 'Two Tickets to NERVO', 50, 'CONCERT IS THIS SATURDAY 9:00 pm-4:00 am The tickets were $30+tax. Total came out to be around $70. It\'s a great deal for a top rated concert.');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/001.png');

INSERT INTO item (user_id, item_name, price, description)	
	VALUES(1, 'Steering Wheel Cover', 10, 'Leather steering wheel cover. I know it fits a jeep wrangler. I only had it on for two days.');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/010.png');

INSERT INTO item (user_id, item_name, price, description)	
	VALUES (1, 'LG HD LED 24 inch TV', 110, 'Comes with the box, power cord and VGA cord. No scratches, great condition. With HDMI port also.');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/017.png');

INSERT INTO item (user_id, item_name, price, description)	
	VALUES (1, 'C Programming Book', 30, 'C How to Program 6th Edition');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/007.png');

INSERT INTO item (user_id, item_name, price, description)	
	VALUES (1, 'CAC Reading Keyboard', 14.99, '');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/014.png');

-- Christopher	
INSERT INTO user (email, password, fname) 
	VALUES ('christopher@gmail.com', 'CHristopher12#$', 'Christopher');

INSERT INTO item (user_id, item_name, price, description)
	VALUES (2, 'Rayban Wayfarers', 100, 'Worn for less than 1 hour.');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/002.png');

INSERT INTO item (user_id, item_name, price, description)
	VALUES (2, 'BeatsBy Dre', 50, 'great for running and working out!');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/011.png');

INSERT INTO item (user_id, item_name, price, description)
	VAlUES (2, 'Beats By Dre Studio', 100, 'comes with factory package and 2 year warranty with Best Buy');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/012.png');

INSERT INTO item (user_id, item_name, price, description)
	VALUES (2, 'Dell 21.5in Monitor', 35, '');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/018.png');
	
-- Kathrine	
INSERT INTO user (email, password, fname) 
VALUES ('kathrine@gmail.com', 'KAtherine12#$', 'Katherine');

INSERT INTO item (user_id, item_name, price, description)
	VALUES (3, 'Otterbox iPhone 5', 10, '');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/003.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (3, 'Lenovo Monitor', 10, 'Lenovo monitor is in good condition. No chords just monitor');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/013.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (3, 'MATLAB Book', 50, 'MATLAB Programming for Engineers Fourth Edition');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/008.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (3, 'NEW Minimus', 40, 'New Newbalance minimus shoes size 11.5');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/015.png');
	
	
-- Matthew
INSERT INTO user (email, password, fname) 
VALUES ('matthew@gmail.com', 'MAtthew12#$', 'Matthew');

INSERT INTO item (user_id, item_name, price, description)
	VALUES (4, 'Paintball Pod Belt', 10, 'Paintball pod belt for three pods, with two smaller sleeves for other stuff.');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/004.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (4, 'Paintball Pants', 35, 'Paintball pants, worn once. Reinforced and padded everywhere it counts. Size S, 26-32.');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/005.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (4, 'Paintball Jersey', 30, 'Paintball jersey, its got padded sleeves. Padding thickness is within league rules. Only worm once!');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/006.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (4, 'Rayban Wayfarers', 100, 'Worn for less than 1 hour.');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/002.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (4, 'BeatsBy Dre', 50, 'great for running and working out!');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/011.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (4, 'Beats By Dre Studio', 100, 'comes with factory package and 2 year warranty with Best Buy');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/012.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (4, 'Dell 21.5in Monitor', 35, '');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/018.png');
	

-- Joshua
INSERT INTO user (email, password, fname) 
VALUES ('joshua@gmail.com', 'JOshua12#$', 'Joshua');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (5, 'C Programming Book', 30, 'C How to Program 6th Edition');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/007.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (5, 'CAC Reading Keyboard', 14.99, '');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/014.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (5, 'Two Tickets to NERVO', 50, 'CONCERT IS THIS SATURDAY 9:00 pm-4:00 am The tickets were $30+tax. Total came out to be around $70. It\'s a great deal for a top rated concert.');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/001.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (5, 'Steering Wheel Cover', 10, 'Leather steering wheel cover. I know it fits a jeep wrangler. I only had it on for two days.');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/010.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (5, 'LG HD LED 24 inch TV', 110, 'Comes with the box, power cord and VGA cord. No scratches, great condition. With HDMI port also.');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/017.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (5, 'C Programming Book', 30, 'C How to Program 6th Edition');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/007.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (5, 'CAC Reading Keyboard', 14.99, '');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/014.png');
	
	
-- Jonathan
INSERT INTO user (email, password, fname) 
VALUES ('jonathan@gmail.com', 'JOnathan12#$', 'Jonathan');

INSERT INTO item (user_id, item_name, price, description)
	VALUES (6, 'MATLAB Book', 50, 'MATLAB Programming for Engineers Fourth Edition');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/008.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (6, 'NEW Minimus', 40, 'New Newbalance minimus shoes size 11.5');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/015.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (6, 'Paintball Pod Belt', 10, 'Paintball pod belt for three pods, with two smaller sleeves for other stuff.');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/004.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (6, 'Paintball Pants', 35, 'Paintball pants, worn once. Reinforced and padded everywhere it counts. Size S, 26-32.');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/005.png');
	
INSERT INTO item (user_id, item_name, price, description)
	VALUES (6, 'Paintball Jersey', 30, 'Paintball jersey, its got padded sleeves. Padding thickness is within league rules. Only worm once!');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/006.png');
	
-- GoNavy!
INSERT INTO user (email, password, fname) 
VALUES 	('gonavy@gmail.com', 'GOnavy12#$', 'GoNavy!');

INSERT INTO item (user_id, item_name, price, description)
	VALUES (7, 'Blackberry Z10', 150, 'Android apps compatible. 2 months used only.');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/009.png');

INSERT INTO item (user_id, item_name, price, description)
	VALUES (7, 'iPhone 5 32GB', 150, 'Used iPhone 5 Has minor cosmetic damage I can jailbreak it for another $10 if you\'re into that. Email me for more pictures');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/016.png');

INSERT INTO item (user_id, item_name, price, description)
	VALUES (7, 'Beats By Dre Studio', 100, 'comes with factory package and 2 year warranty with Best Buy');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/012.png');

INSERT INTO item (user_id, item_name, price, description)
	VALUES (7, 'Dell 21.5in Monitor', 35, '');
INSERT INTO item_picture(item_id, imgpath) values (LAST_INSERT_ID(), 'img/item/018.png');
 /*
-- Insert Chats
INSERT INTO chat (owner_id, item_id) 
	VALUES
		(1,1),
		(1,185),
		(1,39),
		(1,113),
		(1,181),
		(1,109),
		(2,81),
		(2,6),
		(2,42),
		(2,187),
		(2,189),
		(2,80),
		(3,10),
		(3,46),
		(1,1),
		(1,185),
		(1,39),
		(1,113),
		(1,181),
		(1,109),
		(2,81),
		(2,6),
		(2,42),
		(2,187),
		(2,189),
		(2,80),
		(3,10),
		(3,46),
		(3,85),
		(1,1),
		(1,185),
		(1,39),
		(1,113),
		(1,181),
		(1,109),
		(2,81),
		(2,6),
		(2,42),
		(2,187),
		(2,189),
		(2,80),
		(3,10),
		(3,46),
		(3,85),
		(3,85),
		(3,118);

-- Insert test Messages for only one user
INSERT INTO message (chat_id, sender_id, content)
	VALUES 
		(1, 3, 'Hey, I would also like to get into this deal.'),
		(1, 1, 'Sure, I have enough for two people.'),
		(1, 2, 'Hey, this is a test message'),
		(1, 1, 'Hey, i got you\'re message and I am replying to it'),
		(1, 2, 'This is replay number 2.'),
		(1, 1, 'And this is a replay to your reply.'),
		(2, 3, 'I saw that you were selling what you are selling.'),
		(2, 1, 'Yes I am. Do you want it?'),
		(2, 3, 'Sure, for how much?'),
		(2, 1, '$40'),
		(3, 4, 'Hey, this is a test message'),
		(3, 1, 'Hey, i got you\'re message and I am replying to it'),
		(3, 4, 'This is replay number 2.'),
		(3, 1, 'And this is a replay to your reply.');
*/
