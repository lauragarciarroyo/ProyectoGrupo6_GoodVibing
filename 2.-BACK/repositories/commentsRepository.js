const { database } = require("../Infrastructure");

async function findComments() {
  const query = "SELECT * FROM comments";
  const [comments] = await database.pool.query(query);

  return comments;
}

async function addWriteComments(dataComments, userId) {
  const query =
    "INSERT INTO comments (user_id, stories_id, text) VALUES (?, ?, ?)";

  const [result] = await database.pool.query(query, [
    userId,
    data.storiesId,
    data.text,
  ]);

  return findStoriesById(result.insertId);
}

async function editWriteComments(dataComments, userId, text) {
  const query = "UPDATE comments SET  text = ? WHERE id = ?";
  await database.pool.query(query, [text, id]);

  return findStoriesById(id);
}

async function deleteComments(id) {
  const query = "DELETE FROM comments WHERE id = ?";

  return database.pool.query(query, id);
}

module.exports = {
  findComments,
  addWriteComments,
  editWriteComments,
  deleteComments,
};
