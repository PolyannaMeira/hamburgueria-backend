export async function up(queryInterface, Sequelize) {
  // 1) Dropa a tabela antiga (UUID quebrada)
  await queryInterface.dropTable("users");

  // 2) Cria de novo do jeito certo
  await queryInterface.createTable("users", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
}

export async function down(queryInterface) {
  // Se quiser reverter, só derruba a tabela
  await queryInterface.dropTable("users");
}
