const db = require('../../database');

function checkIfValidUUID(str) {
  // Regular expression to check if string is a valid UUID
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(str);
}

class CategoriesRepository {
  async create({
    name,
  }) {
    const [row] = await db.query(`
      INSERT INTO categories(name)
      VALUES($1)
      RETURNING *
    `, [name]);
    return row;
  }

  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT * FROM categories
      ORDER BY name ${direction}
    `);
    return rows;
  }

  async findById(id) {
    if (checkIfValidUUID(id)) {
      const [row] = await db.query(`
      SELECT *
      FROM categories
      WHERE id = $1
    `, [id]);
      return row;
    }
    return undefined;
  }

  async findByName(name) {
    const [row] = await db.query(`
      SELECT *
      FROM categories
      WHERE name = $1
    `, [name]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
      DELETE
      FROM categories
      WHERE id = $1
     `, [id]);
    return deleteOp;
  }
}

module.exports = new CategoriesRepository();