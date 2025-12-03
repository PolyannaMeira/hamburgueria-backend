import Sequelize  from "sequelize";
import mongoose from "mongoose";
import configDatabase from "./../config/database.js";
import User from "../app/models/User.js";
import Product from "../app/models/Product.js";
import Category from "../app/models/Category.js";

const models = [User, Product, Category]


class Database{
    constructor(){
        this.init();
        this.mongo()
    }
    init(){
        // Prefer DATABASE_URL in production (e.g., Render/Neon/Supabase)
        const options = { ...configDatabase };
        if (process.env.DATABASE_URL) {
            // Remove non-option helper key to avoid confusion
            delete options.url;
            this.conection = new Sequelize(process.env.DATABASE_URL, options);
        } else {
            this.conection = new Sequelize(
                configDatabase.database,
                configDatabase.username,
                configDatabase.password,
                options
            );
        }
        models
        .map((model) => model.init(this.conection))
        .map((model) => model.associate && model.associate(this.conection.models))
    }
    mongo() {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    console.log("MONGO_URL não definida, pulando conexão com MongoDB");
    return;
  }

  this.mongoConnection = mongoose
    .connect(mongoUrl)
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => {
      console.error("Erro ao conectar no MongoDB:", err.message);
    });
}

}

export default new Database();