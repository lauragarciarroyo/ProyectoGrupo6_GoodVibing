CREATE DATABASE IF NOT EXISTS goodvibing_app;

USE goodvibing_app;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  bio TEXT,
  residence VARCHAR(255),
  birthdate DATETIME,
  PRIMARY KEY (id)
);

CREATE TABLE stories ( 
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  user_id INT NOT NULL,
  date DATETIME NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE images ( 
  id INT NOT NULL AUTO_INCREMENT,
  filename VARCHAR(255) NOT NULL,
  story_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (story_id) REFERENCES stories(id)
);

CREATE TABLE comments ( 
  id INT NOT NULL AUTO_INCREMENT,
  text TEXT NOT NULL,
  user_id INT NOT NULL,
  story_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (story_id) REFERENCES stories(id)
);

