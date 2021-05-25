const Joi = require("joi");

const { storiesRepository, usersRepository } = require("../repositories");

async function homeStories(req, res, next) {
  try {
    const stories = await storiesRepository.findStoriesById();
    res.send(stories);
  } catch (err) {
    next(err);
  }
}

async function searchStories(req, res, next) {
  try {
    const stories = await storiesRepository.searchStory();
    res.send(stories);
  } catch (err) {
    next(err);
  }
}

//Listar mis historias
async function getMySpace(req, res, next) {
  try {
    const { id } = req.params;

    const user = await usersRepository.findUserById({ id });

    if (!user) {
      const err = new Error("No tiene permiso");
      err.status = 401;
      throw err;
    }

    await storiesRepository.getMySpace();
  } catch (err) {
    next(err);
  }
}

//Ver una historia
async function viewStories(req, res, next) {
  try {
    const { userId } = req.params;
    const { storiesId } = req.params;

    if (Number({ userId }) !== req.auth.id) {
      const err = new Error("El usuario no tiene permiso");
      err.status = 401;
      throw err;
    }

    const story = await storiesRepository.findStoriesById({
      userId,
      storiesId,
    });
    res.send({ story });
  } catch (err) {
    next(err);
  }
}

async function createStories(req, res, next) {
  try {
    const { id } = req.auth;
    const { text } = req.body;
    const { userId } = req.params;

    const schema = Joi.object({
      text: Joi.string().max(1500),
    });

    await schema.validateAsync({ text });

    const user = await usersRepository.findUserById({ userId });

    if (!user) {
      const err = new Error("El usuario no existe");
      err.status = 401;

      throw err;
    }

    const createdStory = await storiesRepository.createdStory({ text, id });
    res.status(201);
    res.send(createdStory);
  } catch (err) {
    next(err);
  }
}

async function editStories(req, res, next) {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const { userId } = req.params;
    const { storiesId } = req.params;

    const schema = Joi.object({
      text: Joi.string().max(1500),
    });

    await schema.validateAsync({ text });

    const story = await storiesRepository.findStoriesById({ id });

    if (!story) {
      const err = new Error("La historia no existe");
      err.status = 404;
      throw err;
    }

    if (Number({ userId }) !== req.auth.id) {
      const err = new Error("El usuario no tiene permiso");
      err.status = 401;
      throw err;
    }

    const updatedStory = await storiesRepository.updateStories({
      storiesId,
      userId,
    });

    res.send(updatedStory);
  } catch (err) {
    next(err);
  }
}

async function deleteStories(req, res, next) {
  try {
    const { id } = req.params;
    const { id: userId } = req.auth;

    const story = await storiesRepository.findStoriesById({ id });

    if (!story) {
      const err = new Error("No existe la historia");
      err.code = 404;

      throw err;
    }

    if (Number({ userId }) !== req.auth.id) {
      const err = new Error("El usuario no tiene permiso");
      err.status = 401;
      throw err;
    }

    await storiesRepository.deleteStories({ id });

    res.status(204);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  homeStories,
  searchStories,
  viewStories,
  createStories,
  editStories,
  deleteStories,
  getMySpace,
};
