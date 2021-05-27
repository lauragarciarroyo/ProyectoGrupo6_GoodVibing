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

// Ver información de un usuario
app.get("/api/users/:id", UsersController.getUser);

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

app.delete(
  "/api/stories/:id",
  validateAuthorization,
  StoriesController.deleteStories
);

// Comments

//Listar comentarios
app.get(
  "/api/stories/:id/comments",
  validateAuthorization,
  CommentsController.getComments
);
//Crear  un comentario
app.post("/api/stories/:id/newcomments", CommentsController.createComments);
app.put(
  "/api/users/:id/stories/:id/newcomments",
  validateAuthorization,
  CommentsController.editComments
);
//Eliminar un comentario
app.delete(
  "/api/users/:id/stories/:id/comments/:id",
  validateAuthorization,
  CommentsController.deleteComments
);

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

// //Votes

// app.post(
//   "/api/users/:id/stories/:id/vote",
//   validateAuthorization,
//   VotesController.createVotes
// );
// app.delete(
//   "/api/users/:id/:story/images/:id/:vote",
//   validateAuthorization,
//   VotesController.deleteVotes
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
