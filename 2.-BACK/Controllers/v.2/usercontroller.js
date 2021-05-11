
//Joi, express, database( con extensión),

async function createUser (req, res)  {
    try {

        const { nameSurname, email, password } = req.body;
        const schema = Joi.object ({
            nameSurname: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(10).required(),
        })
        await userSchema.validateAsync({ nameSurname, email, password });
  
        const passwordHash = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (nameSurname, email, password) VALUES (?, ?, ?)';
        await database.pool.query(query, [nameSurname, email, passwordHash]);
  
        res.send('Usuario creado');

    } catch (err) {
        res.status(500);
        res.send({ err: err.message });
        };
};

async function loginUser (req, res,)  {

    try {
        const { email, password }= req.body;
    
        const schema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().min(6).max(10).required(),
        });
    
        await schema.validateAsync({ email, password });
    
        // 1. Recuperamos el usuario desde la base de datos.
    
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await database.pool.query(query, email);
    
        if (!rows || !rows.length) {
          const error = new Error('No existe el usuario');
          error.code = 404;
          throw error;
        }

        const user = rows[0];
    
        // 2. Comprobamos que el password que nos están enviando es válido.
    
        const isUser = await bcrypt.compare(password, user.);
    
        if (!isValidPassword) {
          const error = new Error('El password no es válido');
          error.code = 401;
          throw error;
        }
    
        // 3. Construimos el JWT para enviárselo al cliente.
        const tokenPayload = { id: user.id };
    
        const token = jwt.sign(
          tokenPayload,
          process.env.SECRET,
          { expiresIn: '30d' },
        );
        
        res.send({ token });
    
      } catch (err) {
        res.status(err.code || 500);
        res.send({ error: err.message });
      }
}



async function recoverPassword (req, res,) {
    try {
        const {email} = req.body;

        const schema = Joi.object ({
            email: Joi.string().email().required(),
        })
        
        await schema.validateAsync({email});
        //Se devolvería un correo con url para introducir una contraseña nueva
    }catch (err) {
        res.send({ error: err.message });
    }
  
};

async function infoUser (req, res,) {
     //Tema 11//
    //Revisamos tema 11, token, comprobar en database//
    try {
        const { authorization } = req.headers;
         
        if (!authorization || !authorization.startsWith('Bearer')) {
            const error = new Error('Authorization header required');
                error.code = 401;
                throw error;
        } 
         
        const token = authorization.slice(7, authorization.length);
        const decodedToken = jwt.verify(token, process.env.SECRET);
         
            // Comprobamos que el usuario para el que fue emitido
            // el token todavía existe.
        const query = 'SELECT * FROM users WHERE id = ?';
        const [users] = await database.pool.query(query, id);
         
        if (!users || !user.length) {
            const error = new Error('El usuario ya no existe');
            error.code = 401;
            throw error;
        } else {
           // res.send = //url del usuario//
        }
         
        req.auth = decodedToken;
        
    } catch (err) {
            res.status(err.code || 500);
            res.send({ error: err.message });
    }
    
}

async function editUser (req, res,) {
    try {
        const {password,biografia, avatar, lugarResidencia } = req.body;
        const schema = Joi.object ({
            password: Joi.string().min(6).max(10).required(),
             biografia : Joi.string().max(250),
        //avatar : Joi. imagen (ver en la documentación)//
    })

    //comprobación cabecera autentificación//
        
        const { authorization } = req.headers;
       
        if (!authorization || !authorization.startsWith('Bearer ')) {
            const error = new Error('Authorization header required');
               error.code = 401;
               throw error;
        }
       
        const token = authorization.slice(7, authorization.length);
        const decodedToken = jwt.verify(token, process.env.SECRET);
       
          // Comprobamos que el usuario para el que fue emitido
          // el token todavía existe.
        const query = 'SELECT * FROM users WHERE id = ?';
        const [users] = await database.pool.query(query, id);
       
        if (!users || !user.length) {
            const error = new Error('El usuario ya no existe');
            error.code = 401;
            throw error;
        } else {
            //res.send = //url de tus datos, para modificar
        }
       
        req.auth = decodedToken;
          
        } catch (err) {
          res.status(err.code || 500);
          res.send({ error: err.message });
        }
}
     
    


async function deleteUser (req, res,) {
    try {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            const error = new Error('Authorization header required');
             error.code = 401;
             throw error;
   }

        const token = authorization.slice(7, authorization.length);
        const decodedToken = jwt.verify(token, process.env.SECRET);

   // Comprobamos que el usuario para el que fue emitido
   // el token todavía existe.
        const query = 'SELECT * FROM users WHERE id = ?';
        const [users] = await database.pool.query(query, id);

        if (!users || !user.length) {
            const error = new Error('El usuario ya no existe');
            error.code = 401;
            throw error;
        } 
        
        //sengrid, mail al usuario//

        req.auth = decodedToken;
   
    } catch (err) {
        res.status(err.code || 500);
        res.send({ error: err.message });
    }
       

}

module.exports = {createUser, loginUser, recoverPassword, infoUser, editUser,deleteUser};
    





