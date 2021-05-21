const Joi = require("joi");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const { usersRepository } = require("../repositories");

async function createUser(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const registerSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(100).required(),
    });

    await registerSchema.validateAsync({ name, email, password });

    const user = await usersRepository.findUserByEmail({ email });

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
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
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
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      residence: user.residence,
      birthdate: user.birthdate,
    });
  } catch (err) {
    next(err);
  }
}

// async function loginUser(req, res, next) {
//   try {
//     const { email, password } = req.body;

//     const schema = Joi.object({
//       email: Joi.string().email().required(),
//       password: Joi.string().min(6).max(10).required(),
//     });

//     await schema.validateAsync({ email, password });

//     const user = await userRepository.getUserByEmail(email);

//     if (!user) {
//       const error = new Error("No existe el usuario");
//       error.code = 404;
//       throw error;
//     }

//     const isValidPassword = await bcrypt.compare(password, user.password);

//     if (!isValidPassword) {
//       const error = new Error("La contraseña  no es válida");
//       error.code = 401;
//       throw error;
//     }

//     const tokenPayload = { id: user.id, role: user.role };

//     const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
//       expiresIn: "30d",
//     });

//     res.send({ userId: user.id, token });
//   } catch (err) {
//     next(err);
//   }
// }

// async function changePassword(req, res, next) {
//   try {
//     const { email } = req.body;

//     const schema = Joi.object({
//       email: Joi.string().email().required(),
//     });

//     await schema.validateAsync({ email });

//     if (!user) {
//       const error = new Error("No existe el usuario");
//       error.code = 404;
//       throw error;
//     }

//     //Se devolvería un correo con url para introducir una contraseña nueva
//   } catch (err) {
//     next(err);
//   }
// }

// async function editUser(req, res, next) {
//   try {
//     const { id } = req.params;
//     const { password, biografia, avatar, lugarResidencia } = req.body;

//     const schema = Joi.object({
//       id: Joi.number().positive(),
//       password: Joi.string().min(6).max(10).required(),
//       biografia: Joi.string().max(250),
//     });
//     await schema.validateAsync({ id, password, biografia });

//     const user = await userRepository.findUserByEmail(email);

//     if (!user) {
//       const error = new Error("No existe el usuario");
//       error.code = 401;
//       throw error;
//     }
//   } catch (err) {
//     next(err);
//   }
// }

// async function deleteUser(req, res, next) {
//   try {
//     const { id } = req.params;

//     const user = await userRepository.findUserById(id);

//     if (!user) {
//       const err = new Error("No tiene permiso para borrar");
//       err.status = 404;
//       throw err;
//     }

//     await userRepository.deleteUser(id);
//     res.status(204);
//     res.send();
//   } catch (err) {
//     next(err);
//   }
// }

module.exports = {
  createUser,
  getUser,
  // editUser,
  // loginUser,
  // changePassword,
  // deleteUser,
};