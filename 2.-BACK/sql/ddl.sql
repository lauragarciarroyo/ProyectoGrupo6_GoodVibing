CREATE DATABASE IF NOT EXISTS goodvibing_app;

USE goodvibing_app;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  completeName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  passwordUser VARCHAR(255) NOT NULL,
  avatarUser,
  residenceUser VARCHAR(255),
  bornUser VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE images ( 
  id INT NOT NULL AUTO_INCREMENT,
  completeName VARCHAR(255) NOT NULL,
  idStories VARCHAR(255) NOT NULL,
  idUser INT,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL
);

CREATE TABLE stories ( 
  id INT NOT NULL AUTO_INCREMENT,
  titleStories VARCHAR(255) NOT NULL,
  completeName VARCHAR(255) NOT NULL,
  idUser INT,
  dateStories VARCHAR(255) NOT NULL,
  textStories VARCHAR(255) NOT NULL,
  tagsStories VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL
);

CREATE TABLE comments ( 
  id INT NOT NULL AUTO_INCREMENT,
  titleStories VARCHAR(255) NOT NULL,
  idUserComments VARCHAR(255) NOT NULL,
  idUser INT,
  textComment VARCHAR(255) NOT NULL
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL
);

