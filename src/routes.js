import { Router } from "express";  
import multer from "multer";
import multerConfig from "./config/multer.js";
import authmiddleware from "../src/app/middleware/auth.js";

import UserController from "./app/controllers/UserController.js";
import SessionController from "./app/controllers/SessionController.js";
import ProductController from "./app/controllers/ProductController.js";
import CategoryController from "./app/controllers/CategoryController.js";
import OrderController from "./app/controllers/OrderController.js";
import CreatePaymentIntentController from "./app/controllers/stripe/CreatePaymentIntentController.js";

const routes = new Router();
const upload = multer(multerConfig);

/**
 * PUBLIC ROUTES
 * These routes are accessible without authentication
 */

// User registration
routes.post('/users', UserController.store);

// User login (session)
routes.post('/sessions', SessionController.store);

// Get all categories (for the store front)
routes.get('/categories', CategoryController.index);

// Get all products (for the store front)
routes.get('/products', ProductController.index);

/**
 * PROTECTED ROUTES
 * These routes require authentication
 */

// Category management (Admin only)
routes.post('/categories', authmiddleware, upload.single('file'), CategoryController.store);
routes.put('/categories/:id', authmiddleware, upload.single('file'), CategoryController.update);

// Product management (Admin only)
routes.post('/products', authmiddleware, upload.single('file'), ProductController.store);
routes.put('/products/:id', authmiddleware, upload.single('file'), ProductController.update);
routes.delete('/products/:id', authmiddleware, ProductController.delete);

// Orders (Require logged-in user)
routes.post('/orders', authmiddleware, OrderController.store);
routes.get('/orders', authmiddleware, OrderController.index);
routes.put('/orders/:id', authmiddleware, OrderController.update);

// Payment intent (Require logged-in user)
routes.post('/create-payment-intent', authmiddleware, CreatePaymentIntentController.store);

export default routes;
