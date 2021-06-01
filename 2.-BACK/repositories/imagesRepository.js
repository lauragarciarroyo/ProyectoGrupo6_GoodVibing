const { database } = require("../infrastructure");

async function addImages() {
  const query = "INSERT INTO images(story_id, filename) VALUES (?,?)";
  const [result] = await database.pool.query(query, [story_id]);

  return findStoriesById({ id: result.insertId });
}

async function deleteImages({ id }) {
  const query = "DELETE FROM images WHERE id = ?";
  return database.pool.query(query, id);
}

async function addAvatar({ id }) {
  const query = "INSERT INTO images WHERE id = ?";
  const [result] = await database.pool.query(query, [id]);

  return result.insertId;
}

async function deleteAvatar({ id }) {
  const query = "DELETE FROM images WHERE id = ?";
  return await database.pool.query(query, [id]);
}

module.exports = { addImages, deleteImages, addAvatar, deleteAvatar };
