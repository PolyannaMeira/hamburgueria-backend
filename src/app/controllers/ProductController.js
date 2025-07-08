import * as YUP from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import User from '../models/User.js';

class ProductController {
  async store(request, response) {
    const schema = YUP.object({
      name: YUP.string().required(),
      price: YUP.number().required(),
      category_id: YUP.number().required(),
      offer: YUP.boolean(),
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

    if (!request.file) {
        return response.status(400).json({ error: 'File is required' });
      }

    const { filename: path } = request.file;
    const { name, price, category_id, offer } = request.body;

    const product = await Product.create({
      name,
      price,
      category_id,
      path,
      offer,
    });

    return response.status(201).json({ product });
  }

  async update(request, response) {
    const schema = YUP.object({
      name: YUP.string(),
      price: YUP.number(),
      category_id: YUP.number(),
      offer: YUP.boolean(),
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

    const {id}= request.params;

    const findProduct = await Product.findByPk(id);

    if(!findProduct){
        return response.status(400).json({ error: 'Make sure your product ID is correct' });
    }

    let path;
    if(request.file){
        path = request.file.filename;
    }
    
    const { name, price, category_id, offer } = request.body;

    await Product.update({
      name,
      price,
      category_id,
      path,
      offer,
    },{
        where: { id },
    });

    return response.status(201).json();
  }

  async delete(request, response) {
    const { admin: isAdmin } = await User.findByPk(request.userId);

    if (!isAdmin) {
      return response.status(401).json({ error: 'User is not admin' });
    }

    const { id } = request.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return response.status(400).json({ error: 'Product not found' });
    }

    await product.destroy();

    return response.status(200).json({ message: 'Product deleted successfully' });
  }


  async index(request, response) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });
    return response.json(products);
  }
}

export default new ProductController();
