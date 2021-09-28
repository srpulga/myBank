const UserRepository = require('../repositories/UsersRepositories');

class UserController {
  async store(request, response) {
    const {
      name, email, phone, balance, income, category_id,
    } = request.body;

    if (!name) {
      return response.status(406).json({ error: 'Name is required' });
    }

    const userExist = await UserRepository.findByEmail(email);

    if (userExist) {
      return response.status(406).json({ error: 'This e-mail is already in use' });
    }

    const user = await UserRepository.create({
      name, email, phone, balance, income, category_id,
    });

    response.json(user);
  }

  async index(request, response) {
    const { oderBy } = request.query;
    const users = await UserRepository.findAll(oderBy);
    response.json(users);
  }

  async show(request, response) {
    const { id } = request.params;

    const user = await UserRepository.findById(id);

    if (!user) {
      return response.status(404).json({ error: 'User Not Found' });
    }

    response.json(user);
  }
}

module.exports = new UserController();