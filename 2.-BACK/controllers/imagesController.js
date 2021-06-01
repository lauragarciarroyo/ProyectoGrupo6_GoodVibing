const Joi = require("joi");

const {
  storiesRepository,
  imagesRepository,
  usersRepository,
} = require("../repositories");

async function uploadImages(req, res, next) {
  try {
    const { story_id } = req.body;
    const { id } = req.auth;
    //validación imagen con Joi

    const story = await storiesRepository.findStoriesById({story_id)};

    if (!story) {
      const err = new Error("La historia no existe");
      err.code = 404;
      throw err;
    }

    const dataImages = { story_id, id, filename };
    const upImages = await imagesRepository.addimages(dataImages);

    res.status(201);
  } catch (err) {
    next(err);
  }
}

async function deleteImages(req, res, next) {
  try {
    const { storiesId } = req.params;
    const { id } = req.auth;
    //validación imagen con Joi

    const story = await storiesRepository.findStoriesById(storiesId);

    if (!story) {
      const err = new Error("La historia no existe");
      err.code = 404;
      throw err;
    }

    const { userImages } = req.body;

    if (user !== userImages) {
      const err = new Error("El usuario no tiene permiso");
      err.code = 401;
      throw err;
    }

    const dataImages = { storiesId, usersId: id, filename };
    const upImages = await imagesRepository.deleteImages(dataImages);

    res.status(201);
  } catch (err) {
    next(err);
  }
}

async function uploadAvatar(req, res, next) {
  try {
    const { id } = req.auth;
    //validación imagen con Joi

    const user = await usersRepository.findUsersById(usersId);

    if (!user) {
      const err = new Error("El usuario no tiene permiso");
      err.code = 401;
      throw err;
    }

    const dataAvatar = { usersId: id, avatar };
    const upAvatar = await imagesRepository.addAvatar(dataAvatar);

    res.status(201);
  } catch (err) {
    next(err);
  }
}

async function deleteAvatar(req, res, next) {
  try {
    const { id } = req.auth;
    //validación imagen con Joi

    const user = await usersRepository.findUsersById(UsersId);

    if (!user) {
      const err = new Error("El usuario no existe");
      err.code = 404;
      throw err;
    }

    const { userAvatar } = req.params; //////////////////////////////////////REVISAR///////////////////////////////////////////

    if (user !== userAvatar) {
      const err = new Error("El usuario no tiene permiso");
      err.code = 401;
      throw err;
    }

    const dataAvatar = { usersId: id, avatar };
    const upAvatar = await imagesRepository.deleteAvatar(dataAvatar);

    res.status(201);
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadImages, deleteImages, uploadAvatar, deleteAvatar };
