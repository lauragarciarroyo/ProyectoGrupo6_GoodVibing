const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { userRepository } = require('../repositories');

async function createUser(req, res, next) {
    try {
      const {name,email,password,repeatedPassword} = req.body;
  
      const registerSchema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(10).required(),
        repeatedPassword: Joi.string().min(6).max(10).required(),
      });
  
      await registerSchema.validateAsync(req.body);
  
      if (password !== repeatedPassword) {
        const err = new Error('Las contraseñas no coinciden');
        err.status = 400;
        throw err;
      }
  
      const user = await usersRepository.getUserByEmail(email);
  
      if (user) {
        const err = new Error('Ya existe un usuario con ese email');
        err.status = 409;
        throw err;
      }
  
      const passwordHash = await bcrypt.hash(password, 10);
      
      const createdUser = await usersRepository.createUser({role: 'user',name,email,passwordHash});
  
      res.status(201);
      res.send(createdUser);
  
    } catch (err) {
      next(err);
    }
  }

  async function loginUser (req, res, next) {
    try {
      const { email, password } = req.body;
  
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(10).required(),
      });
  
      await schema.validateAsync({ email, password });
  
  
      const user = await userRepository.getUserByEmail(email);
  
      if (!user) {
        const error = new Error('No existe el usuario');
        error.code = 404;
        throw error;
      }
  
  
      const isValidPassword = await bcrypt.compare(password, user.password);
  
      if (!isValidPassword) {
        const error = new Error('La contraseña  no es válida');
        error.code = 401;
        throw error;
      }
  
      const tokenPayload = { id: user.id, role: user.role };
  
      const token = jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET,
        { expiresIn: '30d' },
      );
      
      res.send({ userId: user.id,token});
  
    } catch (err) {
      next(err);
    }
  }
  
  async function recoverPassword (req, res,next) {

    // 1. Recuperar al usuario de la base de datos.
    // 2. Si el usuario no existe  error 401 e indicar.
    // 3. Si el usuario existe enviar correo con url para introducir una contraseña nueva.
    try {
        const {email} = req.body;

        const schema = Joi.object ({
            email: Joi.string().email().required(),
        })
        
        await schema.validateAsync({email});
        //Se devolvería un correo con url para introducir una contraseña nueva
    }catch (err) {
        next(err);
    }
  
};
  
async function infoUser (req, res,next) {
    // 1. Comprobar que la persona que solicita ver la información es un usuario.
    // 2. Si la persona no es usuario error, no tiene permiso.
    // 3. Si la persona es usuario de la página tiene permiso y se muestra la página.
   try {
       const { authorization } = req.headers;
   }catch (err) {
       next (err);
   }
}


async function editUser (req, res,next) {///////////REVISAR///////////////////////////////////////////////////////////////
    try {
        const {id} = req.params;
        const {password,biografia, avatar, lugarResidencia } = req.body;
        
        const schema = Joi.object ({
            id: Joi.number(). positive(),
            password: Joi.string().min(6).max(10).required(),
            biografia : Joi.string().max(250),
        })
        await schema.validateAsync ({id, password, biografia});
    
        // recuperar al usuario de la base de datos
        const user = await userRepository.findUserByEmail(email);

        if(!user) {
            const error = new Error ('No existe el usuario');
            error.code = 401;
            throw error;
        }
          
        } catch (err) {
          next(err);
        }
}


async function deleteUser(req, res, next) {
    try {
      const { role } = req.auth;
      const { id } = req.params;
  
      if (role !== 'admin') {
        const err = new Error('Sólo los admins pueden borrar usuarios');
        err.status = 403;
        throw err;
      }
  
      const user = await userRepository.getUserById(id);
  
      if (!user) {
        const err = new Error('No existe el usuario');
        err.status = 404;
        throw err;
      }
  
      await userRepository.deleteUser(id);
      res.status(204);
      res.send();
    } catch (err) {
      next(err);
    }
  }

  module.exports = {createUser, editUser, loginUser, recoverPassword, deleteUser };