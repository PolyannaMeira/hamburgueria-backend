'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('products', 'category_id', {
    type: Sequelize.INTEGER,
    references: {
      model: 'categories',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    allowNull: true,
  });
}
export async function down(queryInterface) {
  await queryInterface.removeColumn('products', 'category_id');
}
