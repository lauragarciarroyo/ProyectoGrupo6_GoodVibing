// express, database( con extensión),

async function createVotes (req, res) {
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
        const query = 'SELECT * FROM votes WHERE id = ?';
        const [users] = await database.pool.query(query, id);
     
        if (!users || !user.length) {
          const error = new Error('El usuario ya no existe');
          error.code = 401;
          throw error;
        }
     
        req.auth = decodedToken;
        
      } catch (err) {
        res.status(err.code || 500);
        res.send({ error: err.message });
      }
}

async function deleteVotes (req, res) {
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
        const query = 'SELECT * FROM votes WHERE id = ?';
        const [users] = await database.pool.query(query, id);
     
        if (!users || !user.length) {
          const error = new Error('El usuario ya no existe');
          error.code = 401;
          throw error;
        }
        req.auth = decodedToken;
      } catch (err) {
        res.status(err.code || 500);
        res.send({ error: err.message });
      }
}