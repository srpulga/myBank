const UserRepositoreis = require('../repositories/UsersRepositories');

class UserController {
  async store(request, response) {
    const {
      name, email, phone, balance, category_id,
    } = request.body;

    if (!name) {
      return response.status(406).json({ error: 'Name is required' });
    }

    const userExist = await UserRepositoreis.findByEmail(email);

    if (userExist) {
      return response.status(406).json({ error: 'This e-mail is already in use' });
    }

    const user = await UserRepositoreis.create({
      name, email, phone, balance, category_id,
    });

    response.json(user);
  }

  async index(request, response) {
    const { oderBy } = request.query;
    const users = await UserRepositoreis.findAll(oderBy);
    response.json(users);
  }

  async show(request, response) {
    const { id } = request.body;

    const user = await UserRepositoreis.findById(id);

    if (!user) {
      return response.status(404).json({ error: 'User Not Found' });
    }

    response.json(user);
  }
}

module.exports = new UserController();