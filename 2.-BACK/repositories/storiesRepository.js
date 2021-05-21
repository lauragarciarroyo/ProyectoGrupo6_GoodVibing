const { database } = require("../Infrastructure");

async function findStoriesById(id) {
  const query = "SELECT * FROM stories WHERE id = ?";
  const [stories] = await database.pool.query(query, id);

  return stories && stories[0];
}

async function searchStory(id) {
  const query = "SELECT * FROM stories WHERE id = ?";
  const [stories] = await database.pool.query(query, id);

  return; ///////URL
}

async function createdStory({ text }, userId) {
  const query = "INSERT INTO stories (text, userId) VALUES (?,?)";
  const [result] = await database.pool.query(query, [userID, text]);

  return findStoriesById(result.insertId);
}

async function updateStories(storiesId, id, text) {
  const query = "UPDATE stories SET storiesId = ?, text = ? WHERE id = ?";
  await database.pool.query(query[(storiesId, text, id)]);

  return findStoriesById(id);
}

async function deleteStories(id) {
  const query = "DELETE FROM stories WHERE id = ?";

  return database.pool.query(query, id);
}

module.exports = {
  findStoriesById,
  searchStory,
  createdStory,
  updateStories,
  deleteStories,
};
