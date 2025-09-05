const pool = require("../db/pool");
module.exports = {
  async insert(user) {
    const { full_name, email, is_admin, password } = user;
    const result = await pool.query(
      "INSERT INTO users (full_name, email, is_admin, password) " +
        "VALUES ($1, $2, $3, $4) RETURNING id",
      [full_name, email, is_admin, password],
    );
    return result.rows[0].id;
  },
  async join(id) {
    const result = await pool.query(
      "UPDATE users SET member = TRUE WHERE id = $1",
      [id],
    );
    return result.rowCount;
  },
  async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  },
  async find(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },
};
