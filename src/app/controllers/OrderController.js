import * as YUP from 'yup';
import Order from '../schemas/Order.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import User from '../models/User.js';

class OrderController {
  async store(request, response) {
    const schema = YUP.object().shape({
      products: YUP.array()
        .required()
        .of(
          YUP.object({
            id: YUP.number().required(),
            quantity: YUP.number().required(),
          }),
        ),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { products } = request.body;

    const productsIds = products.map((product) => product.id);

    const findProducts = await Product.findAll({
      where: {
        id: productsIds,
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    });

    const formattedProducts = findProducts.map((product) => {
      const productIndex = products.findIndex((item) => item.id === product.id);

      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category.name,
        url: product.url,
        quantity: products[productIndex].quantity,
      };
      return newProduct;
    });

    const order = {
      user: {
        id: request.userId,
        name: request.userName,
      },
      products: formattedProducts,
      status: 'Pedido realizado',
    };
    const createOrder = await Order.create(order);
    return response.status(201).json({ createOrder });
  }

  async index(request, response) {
    const orders = await Order.find({});
    return response.json(orders);
  }
  async update(request, response) {
    const schema = YUP.object({
      status: YUP.string().required(),
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
    const { status } = request.body;

    try {
      await Order.updateOne({ _id: id }, { status });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }

    return response.json({ message: 'Status updated successfully' });
  }
}

export default new OrderController();
