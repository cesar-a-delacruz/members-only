const pool = require("../db/pool");
module.exports = {
  async insert(message) {
    const { title, content, user_id } = message;
    const result = await pool.query(
      "INSERT INTO messages (title, content, user_id) " +
        "VALUES ($1, $2, $3) RETURNING id",
      [title, content, user_id],
    );
    return result.rows[0].id;
  },
  async findAll() {
    const result = await pool.query(
      "SELECT messages.*, users.full_name as user FROM messages " +
        "INNER JOIN users ON users.id = messages.user_id ORDER BY post_date DESC",
    );
    return result.rows;
  },
};
