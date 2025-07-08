import * as YUP from 'yup';
import Category from '../models/Category.js';
import User from '../models/User.js';

class CategoryController {
  async store(request, response) {
    const schema = YUP.object({
      name: YUP.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId);

    if (!isAdmin) {
      return response.status(401).json({ error: 'User is not admin' });
    }

    const { filename: path } = request.file;
    const { name } = request.body;

    const categoryExists = await Category.findOne({ where: { name } });

    if (categoryExists) {
      return response.status(400).json({ error: 'Category already exists' });
    }

    const { id } = await Category.create({
      name,
      path,
    });

    return response.status(201).json({ id, name });
  }
  async update(request, response) {
    const schema = YUP.object({
      name: YUP.string(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId);

    if (!isAdmin) {
      return response.status(401).json({ error: 'User is not admin' });
    }

    const { id } = request.params;

    const categoryExist = await Category.findByPk(id);
    if (!categoryExist) {
      return response
        .status(400)
        .json({ message: 'Make sure your category ID is correct' });
    }

    let path;
    if (request.file) {
      path = request.file.filename;
    }

    const { name } = request.body;

    

    if (name) {
      const categoryNameExists = await Category.findOne({ where: { name } });
      if (categoryNameExists && categoryNameExists.id != +id ) {
        return response.status(400).json({ error: 'Category already exists' });
      }
    }

    await categoryExist.update({ name, path }, { where: { id } });

    return response.status(201).json();
  }

  async index(request, response) {
    const categories = await Category.findAll();
    return response.json(categories);
  }
}

export default new CategoryController();
