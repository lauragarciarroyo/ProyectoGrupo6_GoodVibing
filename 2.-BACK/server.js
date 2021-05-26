require("dotenv").config();
const path = require("path");
const express = require("express");

const {
  UsersController,
  // ImagesController,
  // CommentsController,
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

// //Comments
// app.get("/api/users/:id/stories/:id/comments", CommentsController.getComments);
// app.post(
//   "/api/users/:id/stories/:id/newcomments",
//   CommentsController.createcomments
// );
// app.put(
//   "/api/users/:id/stories/:id/newcomments",
//   validateAuthorization,
//   CommentsController.editComments
// );
// app.delete(
//   "/api/users/:id/stories/:id/comments/:id",
//   validateAuthorization,
//   CommentsController.deleteComments
// );

//Stories

//Crear una historia
app.post("/api/stories", validateAuthorization, StoriesController.createStory);

//Ver las historias de un usuario
app.get("/api/users/:id/stories", StoriesController.getUserStories);

//app.get("/api/stories", StoriesController.homeStories);
// app.get("/api/stories/search", StoriesController.searchStories);

// app.get(
//   "/api/stories/:id",
//   validateAuthorization,
//   StoriesController.viewStories
// );

// app.put(
//   "/api/users/:id/stories/:id",
//   validateAuthorization,
//   StoriesController.editStories
// );
// app.delete(
//   "/api/users/:id/stories/:id",
//   validateAuthorization,
//   StoriesController.deleteStories
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
