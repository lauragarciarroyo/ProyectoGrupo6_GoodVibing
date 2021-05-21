const { database } = require("../infrastructure");

async function addImages(dataimages) {
  const query = "INSERT INTO images(storiesId, userId) VALUES (?,?)";
  const [result] = await database.pool.query(query, [storiesId, userID]);

  return findStoriesById(result.insertId);
}

async function deleteImages(id) {
  const query = "DELETE FROM images WHERE id = ?";
  return database.pool.query(query, id);
}

async function addAvatar(userId) {
  const query = "INSERT INTO images WHERE id = ?";
  const [result] = await database.pool.query(query, [userId]);

  return result.insertId;
}

async function deleteAvatar(userid) {
  const query = "DELETE FROM images WHERE id = ?";
  return await database.pool.query(query, [userId]);
}

module.exports = { addImages, deleteImages, addAvatar, deleteAvatar };
