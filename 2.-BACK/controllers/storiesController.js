const Joi = require("joi");

const { storiesRepository, usersRepository } = require("../repositories");

//async function homeStories(req, res, next) {
//try {

//const stories = await storiesRepository.findStoriesById();
//res.send(stories);
// } catch (err) {
//  next(err);
// }
//}

async function createStory(req, res, next) {
  try {
    const { id } = req.auth;
    const { title, body } = req.body;

    const schema = Joi.object({
      title: Joi.string().max(255).required(),
      body: Joi.string().max(1500).required(),
    });

    await schema.validateAsync({ title, body });

    const user = await usersRepository.findUserById({ id });

    if (!user) {
      const err = new Error("El usuario no existe");
      err.status = 401;

      throw err;
    }

    const createdStory = await storiesRepository.createdStory({
      user_id: id,
      title,
      body,
    });

    res.status(201);
    res.send({
      status: "ok",
      data: createdStory,
    });
  } catch (err) {
    next(err);
  }
}

async function searchStories(req, res, next) {
  const { id } = req.params;
  const { tittle, body } = req.body;

  try {
    const stories = await storiesRepository.searchStory({ id, tittle, body });
    res.send(stories);
  } catch (err) {
    next(err);
  }
}

//Listar mis historias
async function getUserStories(req, res, next) {
  try {
    const { id } = req.params;

    const user = await usersRepository.findUserById({ id });

    if (!user) {
      const err = new Error("No existe el usuario");
      err.status = 404;
      throw err;
    }

    const userStories = await storiesRepository.getUserStories({ id });

    // Recortamos el body de la story
    const stories = userStories.map((story) => {
      story.body = story.body.slice(0, 200) + "...";
      return story;
    });

    res.send({
      status: "ok",
      data: stories,
    });
  } catch (err) {
    next(err);
  }
}

//Ver una historia
async function viewStories(req, res, next) {
  try {
    const { id } = req.params;

    // if (Number({ id }) !== req.auth.id) {
    //   const err = new Error("El usuario no tiene permiso");
    //  err.status = 401;
    //  throw err;
    // }
    const story = await storiesRepository.findStoriesById({ id });

    if (!story) {
      const err = new Error("La historia no existe");
      err.status = 404;
      throw err;
    }

    res.send({ story });
  } catch (err) {
    next(err);
  }
}

async function editStories(req, res, next) {
  ///////////////////////NO FUNCIONA
  try {
    const { body, title, date } = req.body;
    const { id } = req.auth;

    const schema = Joi.object({
      body: Joi.string().max(1500),
      title: Joi.string().max(255).required(),
      date: Joi.date().iso(),
    });

    await schema.validateAsync({ body, title, date });

    const story = await storiesRepository.findStoriesById({ id });

    if (!story) {
      const err = new Error("La historia no existe");
      err.status = 404;
      throw err;
    }

    //if (Number({ user_id_ }) !== req.auth.id) {
    // const err = new Error("El usuario no tiene permiso");
    //err.status = 401;
    //throw err;
    //}

    const updatedStory = await storiesRepository.updateStories({
      body,
      title,
      date,
    });

    res.send({
      status: "ok",
      data: updatedStory,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteStories(req, res, next) {
  try {
    const { id } = req.params;

    const story = await storiesRepository.findStoriesById({ id });

    if (!story) {
      const err = new Error("No existe la historia");
      err.code = 404;

      throw err;
    }

    //if (Number({ userId }) !== req.auth.id) {
    // const err = new Error("El usuario no tiene permiso");
    // err.status = 401;
    // throw err;
    //}

    await storiesRepository.deleteStories({ id });

    res.send({
      status: "ok",
      message: `La historia con id ${id} fue borrada`,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  //homeStories,
  searchStories,
  viewStories,
  createStory,
  editStories,
  deleteStories,
  getUserStories,
};
