'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('categories', 'path', {
    type: Sequelize.STRING,
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('categories', 'path');
}
