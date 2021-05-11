CREATE DATABASE IF NOT EXISTS goodvibing_app;

USE goodvibing_app;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE books (
  id INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(255) NOT NULL,
  user_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL
);

INSERT INTO users (nombre, email) VALUES
  ('Hector Gomez', 'hector@mail.com'),
  ('Jaime Perez', 'jaime@mail.com'),
  ('Rodrigo Alvarez', 'rodrigo@mail.com'),
  ('Marta Lopez', 'marta@mail.com');

INSERT INTO books (titulo, autor) VALUES
  ('Crimen y Castigo', 'Fiodor Dostoievski'),
  ('Ficciones', 'Jorge Luis Borges'),
  ('El Castillo', 'Franz Kafka'),
  ('El mito de Sisifo', 'Albert Camus'),
  ('Catedral', 'Raymond Carver');
