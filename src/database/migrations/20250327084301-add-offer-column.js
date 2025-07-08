'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('products', 'offer',
    {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });

}
export async function down(queryInterface) {
  await queryInterface.removeColumn('products', 'offer');

}
