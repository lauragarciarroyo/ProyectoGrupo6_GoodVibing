const {database} = require ('../Infrastructure');

async function getUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [users] = await database.pool.query(query, email);
  
    return users[0];
  
}

async function createUser(params) {
    const {role,name,email,passwordHash} = data;
    
    const insertQuery = 'INSERT INTO users (role, name, email, password) VALUES (?, ?, ?, ?)';
    const [rows] = await database.pool.query(insertQuery, [role, name, email, passwordHash]);
    const createdId = rows.insertId;
    const selectQuery = 'SELECT * FROM users WHERE id = ?';
    const [selectRows] = await database.pool.query(selectQuery, createdId);
    
    return selectRows[0];
    
    
}

async function findUserById(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [users] = await database.pool.query(query, id);
  
    return users[0];
}

async function deleteUser(id) {
    const query = 'DELETE FROM users WHERE id = ?';

    return database.pool.query(query, id);
}

module.exports = {getUserByEmail, createUser, findUserById, deleteUser}