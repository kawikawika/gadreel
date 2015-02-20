-- Author: Kawika Barabin

-- Creating tables for the Favors
-- CREATE DATABASE IF NOT EXISTS FavorsDB;

DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user (
	id integer NOT NULL AUTO_INCREMENT, 
	oauth_uid varchar(255) NULL,
	password varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	fname varchar(255) NOT NULL DEFAULT 'unnamed_user',
	picture varchar(255) NOT NULL DEFAULT 'img/user/default.png',
	CHECK (email like '%@%.%'),
	CONSTRAINT PK_userId PRIMARY KEY (id),
	CONSTRAINT Unique_userEmail UNIQUE (email)
);

DROP TABLE IF EXISTS location;
CREATE TABLE IF NOT EXISTS location (
	id integer NOT NULL,
	lat double(20,10) NOT NULL,
    lon double(20,10) NOT NULL,
    location_name varchar(255) NOT NULL,
    CONSTRAINT PK_locationId PRIMARY KEY (id),
	CONSTRAINT FK_locationId_userID FOREIGN KEY (id)
		REFERENCES user (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

DROP TABLE IF EXISTS item;
CREATE TABLE IF NOT EXISTS item (
	id integer NOT NULL AUTO_INCREMENT,
	item_name varchar(255) NOT NULL,
	price double(10,2) NULL,
	description varchar(255) NULL,
	quantity integer NOT NULL DEFAULT 1,
	stamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
	looking_for boolean NOT NULL DEFAULT false,
	user_id integer NOT NULL, 
	CONSTRAINT PK_itemId PRIMARY KEY (id),
	CONSTRAINT FK_item_userId FOREIGN KEY (user_id) 
		REFERENCES user (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

DROP TABLE IF EXISTS item_picture;
CREATE TABLE IF NOT EXISTS item_picture (
	id integer NOT NULL AUTO_INCREMENT,
	item_id integer NOT NULL,
	imgpath varchar(255) NOT NULL DEFAULT 'img/item/default.png',
	CONSTRAINT PK_itemPicturesId PRIMARY KEY (id),
	CONSTRAINT FK_itemPicture_itemId FOREIGN KEY (item_id)
		REFERENCES item (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

DROP TABLE IF EXISTS chat;
CREATE TABLE IF NOT EXISTS chat (
	id integer NOT NULL AUTO_INCREMENT,
	owner_id integer NOT NULL,
   item_id integer NOT NULL,
	CONSTRAINT PK_chatId PRIMARY KEY (id),
	CONSTRAINT FK_chatOwner_userId FOREIGN KEY (owner_id) 
		REFERENCES user (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT FK_chatItem_itemId FOREIGN KEY (item_id) 
		REFERENCES item (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

DROP TABLE IF EXISTS message;
CREATE TABLE IF NOT EXISTS message (
	id integer NOT NULL AUTO_INCREMENT,
   content varchar(255) NOT NULL,
   unread boolean NOT NULL DEFAULT true,
   sender_id integer NOT NULL,
   chat_id integer NOT NULL,
	stamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(), 
   CONSTRAINT PK_messageId PRIMARY KEY (id),
   CONSTRAINT FK_message_userId FOREIGN KEY (sender_id)
	  REFERENCES user (id)
       ON DELETE CASCADE
       ON UPDATE CASCADE,
	CONSTRAINT FK_message_chatId FOREIGN KEY (chat_id)
		REFERENCES chat (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS setting;
CREATE TABLE IF NOT EXISTS setting (
	id integer NULL,
   notifications boolean NOT NULL DEFAULT true,
   search_distance integer NOT NULL DEFAULT 60,
   CONSTRAINT PK_settingId PRIMARY KEY (id),
   CONSTRAINT FK_setting_userId FOREIGN KEY (id) 
	  REFERENCES user (id)
       ON DELETE CASCADE
       ON UPDATE CASCADE,
	CONSTRAINT Unique_settingId UNIQUE (id)
);

DROP TABLE IF EXISTS transactions;
CREATE TABLE IF NOT EXISTS transactions (
	id integer NOT NULL AUTO_INCREMENT,
   seller_id integer NOT NULL,
   buyer_id integer NOT NULL,
	item_id integer NOT NULL,
	stamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
   CONSTRAINT PK_transactionsId PRIMARY KEY (id),
	CONSTRAINT FK_transactionsSeller_userId FOREIGN KEY (seller_id) 
		REFERENCES user (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT FK_transactionsBuyer_userId FOREIGN KEY (buyer_id) 
		REFERENCES user (id)
		ON DELETE NO ACTION
		ON UPDATE CASCADE
);

DROP TABLE IF EXISTS review;
CREATE TABLE IF NOT EXISTS review (
	id integer NOT NULL AUTO_INCREMENT,
	stamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
   content varchar(255) NOT NULL,
   rating integer NOT NULL,
   CHECK (rating>=5),
   CONSTRAINT PK_reviewId PRIMARY KEY (id),
	CONSTRAINT FK_reviewId_transactionId FOREIGN KEY (id) 
		REFERENCES transactions (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

DROP TABLE IF EXISTS tag;
CREATE TABLE IF NOT EXISTS tag (
	name varchar(255) NOT NULL,
   hits integer NOT NULL DEFAULT 1,
   CONSTRAINT PK_tagsName PRIMARY KEY (name)
);

DROP TABLE IF EXISTS item_tag;
CREATE TABLE IF NOT EXISTS item_tag (
	name varchar(255) NOT NULL,
	item_id integer NOT NULL,
	CONSTRAINT PK_nameItemId PRIMARY KEY (name, item_id),
	CONSTRAINT FK_itemtagName FOREIGN KEY (name) 
		REFERENCEs tag (name)
		ON DELETE NO ACTION
		ON UPDATE CASCADE,
	CONSTRAINT FK_itemtagItemid FOREIGN KEY (item_id) 
		REFERENCEs item (id)
		ON DELETE NO ACTION
		ON UPDATE CASCADE	
);

