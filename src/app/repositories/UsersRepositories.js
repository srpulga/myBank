const db = require('../../database');

function checkIfValidUUID(str) {
  // Regular expression to check if string is a valid UUID
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(str);
}
class UserRepository {
  async create({
    name, email, phone, balance, income, category_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO users(name, email, phone, balance, income, category_id)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [name, email, phone, balance, income, category_id]);
    return row;
  }

  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT * FROM users
      ORDER BY name ${direction}
    `);
    return rows;
  }

  async findByEmail(email) {
    const [row] = await db.query(`
      SELECT * FROM users
      WHERE email = $1
    `, [email]);
    return row;
  }

  async findById(id) {
    if (checkIfValidUUID(id)) {
      const [row] = await db.query(`
      SELECT * FROM users
      WHERE id = $1
    `, [id]);
      return row;
    }
    return undefined;
  }
}

module.exports = new UserRepository();
