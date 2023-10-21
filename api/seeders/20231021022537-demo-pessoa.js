'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Pessoas',
      [
        {
          nome: 'Andre Matos',
          ativo: true,
          email: 'andre.matos@gmail.com',
          role: 'estudante',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Andre silva',
          ativo: true,
          email: 'andre.silva@gmail.com',
          role: 'manager',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Andre trindade',
          ativo: true,
          email: 'andre.trindade@gmail.com',
          role: 'Faxineiro',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Andre matias',
          ativo: true,
          email: 'andre.matias@gmail.com',
          role: 'Diretor',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pessoas', null, {})
  },
}
