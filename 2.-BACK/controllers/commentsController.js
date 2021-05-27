const Joi = require("joi");

const {
  commentsRepository,
  storiesRepository,
  usersRepository,
} = require("../repositories");

async function getComments(req, res, next) {
  try {
    const { id } = req.params;

    const user = await usersRepository.findUserById({ id });

    if (!user) {
      const err = new Error("No existe el usuario");
      err.status = 404;
      throw err;
    }

    const comments = await commentsRepository.findComments();
    res.send(comments);
  } catch (err) {
    next(err);
  }
}

async function createComments(req, res, next) {
  try {
    const { story_id } = req.params;
    const { id } = req.auth;
    const { text } = req.body;

    const schema = Joi.object({
      text: Joi.string().max(250),
    });
    await schema.validateAsync({ text });

    const story = await storiesRepository.findStoriesById({ id });
    if (!story) {
      const err = new Error("La historia no existe");
      err.code = 404;
      throw err;
    }

    const user = await usersRepository.findUserId({ id });
    if (!user) {
      const err = new Error("El usuario no existe");
      err.code = 404;
      throw err;
    }

    const dataComments = { user_id: id, text, story_id };
    const writeComments = await commentsRepository.createComments({
      dataComments,
    });

    res.send({
      status: "ok",
      data: writeComments,
    });
  } catch (err) {
    next(err);
  }
}

async function editComments(req, res, next) {
  try {
    const { story_id } = req.params;
    const { id } = req.auth;
    const { text } = req.body;

    const schema = Joi.object({
      text: Joi.string().max(250),
    });
    await schema.validateAsync({ text });

    const story = await storiesRepository.findStoriesById({ id });
    if (!story) {
      const err = new Error("La historia no existe");
      err.code = 404;
      throw err;
    }

    const dataComments = { user_id: id, story_id, text };
    const writeComments = await commentsRepository.editWriteComments(
      dataComments
    );

    res.send({
      status: "ok",
      data: writeComments,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteComments(req, res, next) {
  try {
    const { id } = req.auth;

    const comment = await commentsRepository.findCommentsById({ id });
    if (!comment) {
      const err = new Error("El comentario no existe");
      err.code = 404;
      throw err;
    }

    await commentsRepository.deleteComments({ id });

    res.send({
      status: "ok",
      message: `el comentario con id ${id} fue borrado`,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getComments, createComments, editComments, deleteComments };
