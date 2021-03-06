DROP DATABASE IF EXISTS groupomania;

CREATE DATABASE groupomania CHARACTER SET utf8;

USE groupomania;

CREATE TABLE User (
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(200) NOT NULL,
name VARCHAR(25) NOT NULL,
first_name VARCHAR(25) NOT NULL,
image_url TEXT NULL,
is_admin TINYINT DEFAULT 0,
PRIMARY KEY(email)
)
ENGINE=INNODB;


CREATE TABLE Post (
id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
user_email VARCHAR(100) NOT NULL,
content TEXT NULL,
title TEXT NOT NULL,
image_url TEXT NULL,
post_like SMALLINT NULL DEFAULT 0,
user_name VARCHAR(25) NOT NULL,
user_firstname VARCHAR(25) NOT NULL,
created_at DATETIME NOT NULL,
PRIMARY KEY(id),
CONSTRAINT fk_user_email FOREIGN KEY (user_email) REFERENCES User(email) ON DELETE CASCADE 
)
ENGINE=INNODB;


CREATE TABLE Comment (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
post_id MEDIUMINT UNSIGNED NOT NULL,
user_email_comment VARCHAR(100) NOT NULL,
content TEXT NOT NULL,
user_name_comment VARCHAR(25) NOT NULL,
user_firstname_comment VARCHAR(25) NOT NULL,
created_at DATETIME NOT NULL,
PRIMARY KEY(id),
CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE
)
ENGINE=INNODB;


CREATE TABLE Like_state (	
id INT UNSIGNED NOT NULL AUTO_INCREMENT,	
user_like_email VARCHAR(100) NOT NULL,
post_id MEDIUMINT UNSIGNED NOT NULL,
user_like SMALLINT NULL,
PRIMARY KEY(id)
)
ENGINE=INNODB;





