require("dotenv").config();
const path = require("path");
const express = require("express");

const {
  UsersController,
  // ImagesController,
  CommentsController,
  StoriesController,
  // VotesController,
} = require("./controllers");

const { validateAuthorization } = require("./middlewares");

const { PORT } = process.env;

const staticPath = path.resolve(__dirname, "static");

const app = express();
app.use(express.json());
app.use(express.static(staticPath));

// //Users

// Crea un usuario
app.post("/api/users", UsersController.createUser);

// Hace login, devuelve token
app.post("/api/users/login", UsersController.loginUser);

// Ver información de un usuario (PENDIENTE: mostrar los comentarios del usuario SI SOY YO)
app.get("/api/users/:user_id", validateAuthorization, UsersController.getUser);

// Cambiar datos de un usuario
app.put("/api/users/", validateAuthorization, UsersController.editUser);

// Cambia contraseña
app.post(
  "/api/users/change-password",
  validateAuthorization,
  UsersController.changePassword
);

// Borrar un usuario
app.delete("/api/users/", validateAuthorization, UsersController.deleteUser);

//Stories

//Crear una historia
app.post("/api/stories", validateAuthorization, StoriesController.createStory);

// Ver últimas historias
app.get("/api/stories", StoriesController.getStories);

//Ver las historias de un usuario
app.get("/api/users/:id/stories", StoriesController.getUserStories);

//Ver una historia
app.get(
  "/api/stories/:id",
  validateAuthorization,
  StoriesController.viewStories
);

//Editar historia
app.put(
  "/api/stories/:id_story",
  validateAuthorization,
  StoriesController.editStories
);

//Borrar una historia
app.delete(
  "/api/stories/:id",
  validateAuthorization,
  StoriesController.deleteStories
);

// Comments

//Crear un comentario
app.post(
  "/api/stories/:story_id/comments",
  validateAuthorization,
  CommentsController.createComments
);

// Eliminar un comentario
app.delete(
  "/api/comments/:comment_id",
  validateAuthorization,
  CommentsController.deleteComments
);

// //Votes
// app.post(
//   "/api/stories/:id/vote",
//   validateAuthorization,
//   VotesController.createVotes
// );

// IMPORTANTE: Comprobar que no exista previamente un voto

// app.delete(
//   "/api/stories/:id/vote",
//   validateAuthorization,
//   VotesController.deleteVotes
// );

// //Images
// app.post(
//   "/api/users/:id/stories/images",
//   validateAuthorization,
//   ImagesController.uploadImages
// );
// app.delete(
//   "/api/users/:id/:story/images/:id",
//   validateAuthorization,
//   ImagesController.deleteImages
// );
// app.post(
//   "/api/users/:id",
//   validateAuthorization,
//   ImagesController.uploadAvatar
// );
// app.delete(
//   "/api/users/:id",
//   validateAuthorization,
//   ImagesController.deleteAvatar
// );
app.use((err, req, res, next) => {
  const status = err.isJoi ? 400 : err.status || 500;
  res.status(status);
  res.send({ status: "error", message: err.message });
});

app.use((req, res) => {
  res.status(404).send({ status: "error", message: "Not found!" });
});

// Escuchar un puerto
app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));
