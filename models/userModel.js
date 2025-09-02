const pool = require("../db/pool");
module.exports = {
  async insert(user) {
    const { full_name, email, password } = user;
    const result = await pool.query(
      "INSERT INTO users (full_name, email, password) " + "VALUES ($1, $2, $3)",
      [full_name, email, password],
    );
    return result.rowCount;
  },
};
