import fs from 'node:fs';
import path from 'node:path';

const images = [
  'classic-burger.jpg',
  'cheeseburger.jpg',
  'bacon-burger.jpg',
  'double-burger.jpg',
  'veggie-burger.jpg',
  'soda-can.jpg',
  'water.jpg',
  'juice.jpg',
  'milkshake-chocolate.jpg',
  'milkshake-strawberry.jpg',
  'brownie.jpg',
  'petit-gateau.jpg',
  'ice-cream.jpg',
  'cookie.jpg',
  'cheesecake.jpg',
  'fries.jpg',
  'onion-rings.jpg',
  'nuggets.jpg',
  'mozzarella-sticks.jpg',
  'garlic-bread.jpg',
  // Category cover images
  'category-burgers.jpg',
  'category-drinks.jpg',
  'category-desserts.jpg',
  'category-starters.jpg',
];

const uploadsDir = path.resolve(process.cwd(), 'uploads');

async function run() {
  try {
    if (!fs.existsSync(uploadsDir)) {
      console.error('Pasta "uploads/" não existe na raiz do projeto.');
      console.error('Crie a pasta uploads/ e coloque as imagens lá.');
      process.exit(1);
    }

    let missing = 0;

    for (const name of images) {
      const filePath = path.join(uploadsDir, name);

      if (fs.existsSync(filePath)) {
        console.log(`ok: ${name}`);
      } else {
        console.warn(`MISSING: ${name} não encontrado em uploads/`);
        missing++;
      }
    }

    if (missing === 0) {
      console.log('Todas as imagens estão presentes em uploads/.');
    } else {
      console.log(`${missing} imagem(ns) faltando em uploads/.`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Erro ao verificar imagens:', err);
    process.exit(1);
  }
}

run();
