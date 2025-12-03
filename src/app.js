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

    this.app.use(
      cors({
        origin: true,        // reflete qualquer origin
        credentials: true,   // permite cookies/headers de auth
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
    // simple health check
    this.app.get('/health', (req, res) => {
      res.status(200).json({ status: 'ok' });
    });
    this.app.use(routes);
  }
}

export default new App().app;
