requestAnimationFrame('dotenv').config();
const express = require('express');

const {usersController, commentsController, imagesController, storiesController} = require('./controllers');

const app = express();

app.use(express.json());

// Users 
app.get('/api/users', usersController.getUsers);
app.get('/api/users/:id', usersController.getUserById);

// Images

// Stories

// Comments

// Votes







app.listen(3000, () => console.log('Escuchando'));
