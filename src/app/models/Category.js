import Sequelize, { Model, DataTypes } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.BASE_URL}/category-file/${this.path}`;
          },
        },
      },
      {
        sequelize,
        tableName: "categories",   // <- bate com a migration
        timestamps: true,
        createdAt: "created_at",   // <- mapeia pro nome da coluna
        updatedAt: "updated_at",
      }
    );
    return this;
  }
}

export default Category;
