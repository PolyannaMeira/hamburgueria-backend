import express from 'express';
import { resolve } from 'node:path';
import cors from 'cors';
import routes from './routes.js';
import './database/index.js';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import 'dotenv/config';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class App {
  constructor() {
    this.app = express();

    const allowedOrigins = [
      'http://localhost:5173',
      'https://hamburgueria-frontend.vercel.app',
    ];

    this.app.use(
  cors({
    origin: true,       // reflete qualquer origin válido
    credentials: true,
  })
);


    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads')));
    this.app.use('/category-file', express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
