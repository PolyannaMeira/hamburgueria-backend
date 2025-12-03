import 'dotenv/config';
import Database from '../src/database/index.js';
import Category from '../src/app/models/Category.js';
import Product from '../src/app/models/Product.js';
import User from '../src/app/models/User.js';

async function run() {
  try {
    // Ensure DB connections and models are initialized
    // Database constructor already initializes Sequelize and Mongoose

    const categories = [
      { name: 'Hambúrgueres', path: 'category-burgers.jpg' },
      { name: 'Bebidas', path: 'category-drinks.jpg' },
      { name: 'Sobremesas', path: 'category-desserts.jpg' },
      { name: 'Entradas', path: 'category-starters.jpg' },
    ];

    // Upsert categories
    const createdCategories = [];
    for (const cat of categories) {
      const [created] = await Category.findOrCreate({
        where: { name: cat.name },
        defaults: cat,
      });
      // ensure path is updated if not set
      if (!created.path && cat.path) {
        await created.update({ path: cat.path });
      }
      createdCategories.push(created);
    }

    const categoryMap = Object.fromEntries(
      createdCategories.map((c) => [c.name, c.id])
    );

    const products = [
      // Hambúrgueres
      { name: 'Clássico Burger', price: 2999, offer: false, path: 'classic-burger.jpg', category_id: categoryMap['Hambúrgueres'] },
      { name: 'Cheeseburger', price: 3199, offer: false, path: 'cheeseburger.jpg', category_id: categoryMap['Hambúrgueres'] },
      { name: 'Bacon Burger', price: 3599, offer: false, path: 'bacon-burger.jpg', category_id: categoryMap['Hambúrgueres'] },
      { name: 'Duplo Burger', price: 3999, offer: false, path: 'double-burger.jpg', category_id: categoryMap['Hambúrgueres'] },
      { name: 'Veggie Burger', price: 2899, offer: false, path: 'veggie-burger.jpg', category_id: categoryMap['Hambúrgueres'] },
      // Bebidas
      { name: 'Refrigerante Lata', price: 899, offer: false, path: 'soda-can.jpg', category_id: categoryMap['Bebidas'] },
      { name: 'Água Mineral', price: 599, offer: false, path: 'water.jpg', category_id: categoryMap['Bebidas'] },
      { name: 'Suco Natural', price: 1299, offer: false, path: 'juice.jpg', category_id: categoryMap['Bebidas'] },
      { name: 'Milkshake Chocolate', price: 1799, offer: false, path: 'milkshake-chocolate.jpg', category_id: categoryMap['Bebidas'] },
      { name: 'Milkshake Morango', price: 1799, offer: false, path: 'milkshake-strawberry.jpg', category_id: categoryMap['Bebidas'] },
      // Sobremesas
      { name: 'Brownie', price: 1299, offer: false, path: 'brownie.jpg', category_id: categoryMap['Sobremesas'] },
      { name: 'Petit Gateau', price: 1699, offer: false, path: 'petit-gateau.jpg', category_id: categoryMap['Sobremesas'] },
      { name: 'Sorvete', price: 999, offer: false, path: 'ice-cream.jpg', category_id: categoryMap['Sobremesas'] },
      { name: 'Cookie', price: 799, offer: false, path: 'cookie.jpg', category_id: categoryMap['Sobremesas'] },
      { name: 'Cheesecake', price: 1499, offer: false, path: 'cheesecake.jpg', category_id: categoryMap['Sobremesas'] },
      // Entradas
      { name: 'Batata Frita', price: 1499, offer: false, path: 'fries.jpg', category_id: categoryMap['Entradas'] },
      { name: 'Onion Rings', price: 1499, offer: false, path: 'onion-rings.jpg', category_id: categoryMap['Entradas'] },
      { name: 'Nuggets', price: 1599, offer: false, path: 'nuggets.jpg', category_id: categoryMap['Entradas'] },
      { name: 'Mozzarella Sticks', price: 1699, offer: false, path: 'mozzarella-sticks.jpg', category_id: categoryMap['Entradas'] },
      { name: 'Pão de Alho', price: 999, offer: false, path: 'garlic-bread.jpg', category_id: categoryMap['Entradas'] },
    ];

    for (const p of products) {
      await Product.findOrCreate({
        where: { name: p.name },
        defaults: p,
      });
    }

    // Admin user
    /*
    const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@devburger.com';
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'devburger123';
    const adminName = process.env.SEED_ADMIN_NAME || 'Admin';

    const [adminUser, created] = await User.findOrCreate({
      where: { email: adminEmail },
      defaults: { name: adminName, email: adminEmail, password: adminPassword, admin: true },
    });
    if (!created) {
      // ensure admin flag true; update password only if explicitly set via env
      const toUpdate = { admin: true };
      if (process.env.SEED_ADMIN_PASSWORD) toUpdate.password = adminPassword;
      await adminUser.update(toUpdate);
    }
      */

    console.log('Seed concluído: categorias, produtos e admin inseridos.');
    process.exit(0);
  } catch (err) {
    console.error('Erro no seed:', err);
    process.exit(1);
  }
}

run();
