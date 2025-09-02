const pool = require("../db/pool");
module.exports = {
  async insert(user) {
    const { full_name, email, password } = user;
    const result = await pool.query(
      "INSERT INTO users (full_name, email, password) " +
        "VALUES ($1, $2, $3) RETURNING id",
      [full_name, email, password],
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
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    return result.rows[0];
  },
};
