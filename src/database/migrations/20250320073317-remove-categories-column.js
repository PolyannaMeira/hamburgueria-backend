'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  await queryInterface.removeColumn('products', 'category');

}
export async function down(queryInterface, Sequelize) {
  await queryInterface.addColumn('products', 'category', {
    type: Sequelize.STRING,
    allowNull: true,
  }
  );

}
