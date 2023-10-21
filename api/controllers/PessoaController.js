const database = require('../models')

class PessoaController {
  static async buscarTodasPessoas(req, res) {
    try {
      const todasPessoas = await database.Pessoas.findAll()
      return res.status(200).json(todasPessoas)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
}
module.exports = PessoaController
