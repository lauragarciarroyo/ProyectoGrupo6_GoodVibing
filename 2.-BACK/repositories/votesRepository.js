const { database } = require("../infrastructure");

async function createVotes({ user_id, story_id, vote }) {
  const query =
    "INSERT INTO votes (user_id, stories_id , vote) VALUES (?, ?, ?)";
  const [result] = await database.pool.query(query, [user_id, story_id, vote]);
  return findVotesById(result.insertId);
}

async function findVotesById({ id }) {
  const query = "SELECT * FROM votes WHERE id = ?";
  const votes = await database.pool.query(query, [id]);

  return votes;
}

async function deleteVotes({ id }) {
  const query = "DELETE FROM votes WHERE id = ?";

  return await database.pool.query(query, [id]);
}

module.exports = { createVotes, deleteVotes, findVotesById };
