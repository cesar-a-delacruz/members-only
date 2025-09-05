const pool = require("../db/pool");
module.exports = {
  async insert(user) {
    const { full_name, email, password, member, is_admin } = user;
    const result = await pool.query(
      "INSERT INTO users (full_name, email, password, member, is_admin) " +
        "VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [full_name, email, password, member, is_admin],
    );
    return result.rows[0].id;
  },
  async find(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },
  async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  },
  async join(id) {
    const result = await pool.query(
      "UPDATE users SET member = TRUE WHERE id = $1",
      [id],
    );
    return result.rowCount;
  },
};
