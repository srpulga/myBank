const db = require('../../database');

class ContactsRepositories {
  async create({
    name, email, phone, balance, category_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO users(name, email, phone, balance, category_id)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `, [name, email, phone, balance, category_id]);
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
    const [row] = await db.query(`
      SELECT * FROM users
      WHERE id = $1
    `, [id]);
    return row;
  }
}

module.exports = new ContactsRepositories();
