const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { usersRepository } = require("../repositories");

async function createUser(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const registerSchema = Joi.object({
      name: Joi.string().required().max(255),
      email: Joi.string().email().required().max(255),
      password: Joi.string().min(6).max(100).required(),
    });

    await registerSchema.validateAsync({ name, email, password });

    const user = await usersRepository.findUserByEmail({ email });

    //si ya hay un usuario con el mismo email generamos un error
    if (user) {
      const err = new Error("Ya existe un usuario con ese email");
      err.status = 409;
      throw err;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const createdUser = await usersRepository.createUser({
      name,
      email,
      passwordHash,
    });

    res.status(201);
    res.send({
      status: "ok",
      data: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const { id } = req.params;

    const user = await usersRepository.findUserById({ id });

    if (!user) {
      const error = new Error("No existe el usuario");
      error.status = 404;
      throw error;
    }

    res.send({
      status: "ok",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        residence: user.residence,
        birthdate: user.birthdate,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(100).required(),
    });

    await schema.validateAsync({ email, password });

    const user = await usersRepository.findUserByEmail({ email });

    if (!user) {
      const error = new Error("No existe el usuario");
      error.code = 404;
      throw error;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      const error = new Error("La contraseña no es válida");
      error.code = 401;
      throw error;
    }

    const tokenPayload = { id: user.id };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.send({ status: "ok", data: { userId: user.id, token } });
  } catch (err) {
    next(err);
  }
}

async function editUser(req, res, next) {
  try {
    const { id } = req.params;

    // La fecha en formato iso podéis encontrarla aquí: https://www.utctime.net/ (es la ISO-8601)
    const { name, email, bio, residence, birthdate } = req.body;

    const schema = Joi.object({
      name: Joi.string().required().max(255),
      email: Joi.string().email().required().max(255),
      bio: Joi.string(),
      residence: Joi.string().max(255),
      birthdate: Joi.date().iso(),
    });

    await schema.validateAsync({ name, email, bio, residence, birthdate });

    const user = await usersRepository.findUserById({ id });

    if (!user) {
      const error = new Error("No existe el usuario");
      error.code = 401;
      throw error;
    }

    const updatedUser = await usersRepository.editUser({
      id,
      name,
      email,
      bio,
      residence,
      birthdate,
    });

    res.send({
      status: "ok",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
}

async function changePassword(req, res, next) {
  ////////////////////////////////////////////////////////////////////////////////////preguntar
  try {
    const { email } = req.body;
    const { id } = req.params;

    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    await schema.validateAsync({ email });

    const user = await usersRepository.findUserById({ id });

    if (!user) {
      const error = new Error("No existe el usuario");
      error.code = 404;
      throw error;
    }
    await usersRepository.changePassword({ id });
    res.status(204);
    res.send();

    //Se devolvería un correo con url para introducir una contraseña nueva
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    const user = await usersRepository.findUserById({ id });

    if (!user) {
      const err = new Error("No tiene permiso para borrar");
      err.status = 404;
      throw err;
    }

    await usersRepository.deleteUser({ id });
    res.status(204);
    res.send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  getUser,
  loginUser,
  editUser,
  changePassword,
  deleteUser,
};
