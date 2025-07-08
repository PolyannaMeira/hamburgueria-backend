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
        this.conection = new Sequelize(configDatabase);
        models
        .map((model) => model.init(this.conection))
        .map((model) => model.associate && model.associate(this.conection.models))
    }
    mongo(){
        this.mongoConnection = mongoose.connect("mongodb://localhost:27018/devburger",);
    }
}

export default new Database();