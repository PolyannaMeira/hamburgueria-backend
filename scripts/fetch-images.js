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
  'category-starters.jpg'
];

const uploadsDir = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

async function download(url, dest) {
  // Use global fetch (Node 18+) which follows redirects (302) automatically
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.promises.writeFile(dest, buffer);
}

async function run() {
  try {
    for (const name of images) {
      const seed = name.replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/gi, '-');
      const url = `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/600`;
      const dest = path.join(uploadsDir, name);
      if (fs.existsSync(dest)) {
        console.log(`skip: ${name} already exists`);
        continue;
      }
      console.log(`fetch: ${name}`);
      await download(url, dest);
    }
    console.log('All images fetched to uploads/.');
    process.exit(0);
  } catch (err) {
    console.error('Failed to fetch images:', err);
    process.exit(1);
  }
}

run();
