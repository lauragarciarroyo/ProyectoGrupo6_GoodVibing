const { database } = require("../infrastructure");

async function findStoriesById({ id }) {
  const query = "SELECT * FROM stories WHERE id = ?";
  const [stories] = await database.pool.query(query, [id]);

  return stories[0];
}

async function searchStory({ id, tittle, body }) {
  const query = "SELECT * FROM stories WHERE id = ?";
  const [stories] = await database.pool.query(query, [id, tittle, body]);

  return [stories];
}

async function createdStory({ user_id, title, body }) {
  const query = `
    INSERT INTO stories (title, body, user_id, date) 
    VALUES (?, ?, ?, ?)
    `;

  const [result] = await database.pool.query(query, [
    title,
    body,
    user_id,
    new Date(),
  ]);

  return findStoriesById({ id: result.insertId });
}

async function updateStories({ storiesId, id, text }) {
  const query = "UPDATE stories SET storiesId = ?, text = ? WHERE id = ?";
  await database.pool.query(query[(storiesId, text, id)]);

  return findStoriesById(id);
}

async function deleteStories({ id }) {
  const query = "DELETE FROM stories WHERE id = ?";

  return await database.pool.query(query, id);
}

async function getUserStories({ id }) {
  const query = `
    SELECT *
    FROM stories
    WHERE user_id = ?
  `;

  const [result] = await database.pool.query(query, [id]);

  return result;
}

module.exports = {
  findStoriesById,
  searchStory,
  createdStory,
  updateStories,
  deleteStories,
  getUserStories,
};
