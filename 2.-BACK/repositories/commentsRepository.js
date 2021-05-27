const { database } = require("../infrastructure");

async function findCommentsById({ id }) {
  const query = "SELECT * FROM comments WHERE id = ?";
  const [comments] = await database.pool.query(query, [id]);

  return comments[0];
}

async function createComments({ user_id, story_id, text }) {
  const query =
    "INSERT INTO comments (user_id, story_id, text) VALUES (?, ?, ?)";

  const [result] = await database.pool.query(query, [user_id, story_id, text]);

  return findCommentsById({ id: result.insertId });
}

async function editComments({ text, id }) {
  const query = "UPDATE comments SET  text = ? WHERE id = ?";
  await database.pool.query(query, [text, id]);

  return findCommentsById({ id });
}

async function deleteComments(id) {
  const query = "DELETE FROM comments WHERE id = ?";

  return database.pool.query(query, id);
}

module.exports = {
  findCommentsById,
  createComments,
  editComments,
  deleteComments,
};
