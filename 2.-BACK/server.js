require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const {
    ImagesController,
    CommentsController,
    StoriesController,
    UsersController,
    VotesController
} = require('./controllers');

const { validateAuthorization } = require('./middlewares');

const { PORT } = process.env;

const staticPath = path.resolve(__dirname, 'static');

const app = express();
app.use(express.json());
app.use(express.static(staticPath));

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const { id } = req.params;
      const folder = path.join(__dirname, `static/images/${id}/`);
      fs.mkdirSync(folder, { recursive: true });

      cb(null, folder)
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + path.extname(file.originalname))
    }
  }),
  limits: {
    fileSize: 1024 * 1024, // 1 MB
  }
});


//Comments
app.get('/api/users/:id/stories/:id/comments', CommentsController.getComments);
app.post('/api/users/:id/stories/:id/newcomments', CommentsController.createcomments);
app.put('/api/users/:id/stories/:id/newcomments', validateAuthorization, CommentsController.editComments);
app.delete('/api/users/:id/stories/:id/comments/:id',validateAuthorization, CommentsController.deleteComments);

//Users
app.post('/api/users', validateAuthorization, UsersController.createUser);
app.post('/api/users/login', UsersController.login);
app.post('/api/users/recover-password', UsersController.recoverPassword);
app.get('/api/users/:id',UsersController.infoUser);
app.put('/api/users/:id', UsersController.editUser);
app.delete('/api/users/:id', validateAuthorization, UsersController.deleteUser);

//Stories
app.get('/api/stories', StoriesController.homeStories);
app.get('/api/stories/search', StoriesController.searchStories);
app.get('/api/users/:id/stories', validateAuthorization, StoriesController.getMySpace);
app.get('/api/stories/:id', validateAuthorization, StoriesController.viewStories);
app.post('/api/users/:id/stories/:id', validateAuthorization, StoriesController.createStories);
app.put('/api/users/:id/stories/:id', validateAuthorization, StoriesController.editStories);
app.delete('/api/users/:id/stories/:id', validateAuthorization, StoriesController.deleteStories);



//Images
app.post('/api/users/:id/stories/images', validateAuthorization, ImagesController.uploadImages);
app.delete('/api/users/:id/:story/images/:id', validateAuthorization, ImagesController.deleteImages);
app.post('/api/users/:id', validateAuthorization, ImagesController.uploadAvatar);
app.delete('/api/users/:id', validateAuthorization, ImagesController.deleteAvatar);


//Votes

app.post('/api/users/:id/stories/:id/vote', validateAuthorization, VotesController.createVotes);
app.delete('/api/users/:id/:story/images/:id/:vote', validateAuthorization, VotesController.deleteVotes);


app.use(async (err, req, res, next) => {
  const status = err.isJoi ? 400 : (err.status || 500);
  res.status(status);
  res.send({ resultado: 'ERROR', error: err.message });
});

// Escuchar un puerto
app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));
