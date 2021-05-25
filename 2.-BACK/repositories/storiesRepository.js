const { database } = require("../infrastructure");

async function findStoriesById({ id }) {
  const query = "SELECT * FROM stories WHERE id = ?";
  const [stories] = await database.pool.query(query, id);

  return stories && stories[0];
}

async function searchStory({ id, tittle, body }) {
  const query = "SELECT * FROM stories WHERE id = ?";
  const [stories] = await database.pool.query(query, [id, tittle, body]);

  return [stories];
}

async function createdStory({ body, id }) {
  const query = "INSERT INTO stories (body, id) VALUES (?,?)";
  const [result] = await database.pool.query(query, [id, body]);

  return findStoriesById(result.insertId);
}

async function updateStories({ storiesId, id, text }) {
  const query = "UPDATE stories SET storiesId = ?, text = ? WHERE id = ?";
  await database.pool.query(query[(storiesId, text, id)]);

  return findStoriesById(id);
}

async function deleteStories({ id }) {
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
