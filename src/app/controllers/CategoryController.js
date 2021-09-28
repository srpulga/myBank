const CategoriesRepository = require('../repositories/CategoriesRepositories');

class CategoryController {
  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(406).json({ error: 'Name is required!' });
    }

    const categoryExists = await CategoriesRepository.findByName(name);

    if (categoryExists) {
      return response.status(406).json({ error: 'This name is already in use!' });
    }

    const category = await CategoriesRepository.create({ name });

    response.json(category);
  }

  async index(request, response) {
    const { oderBy } = request.query;
    const category = await CategoriesRepository.findAll(oderBy);
    response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoriesRepository.delete(id);

    response.sendStatus(200);
  }
}

module.exports = new CategoryController();