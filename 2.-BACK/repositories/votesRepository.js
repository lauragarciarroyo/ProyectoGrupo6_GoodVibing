const { database } = require("../infrastructure");

async function addVotes() {
  const query = "INSERT INTO votes (stories_id user_id) VALUES (?, ?)";
  const [result] = await database.pool.query(query, [storiesId, userId]);
  return findStoriesById(result.insertId);
}

async function deleteVotes() {
  const query = "DELETE FROM votes WHERE id = ?";

  return database.pool.query(query, id);
}

module.exports = { addVotes, deleteVotes };
