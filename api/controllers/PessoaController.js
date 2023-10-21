const database = require('../models')

class PessoaController {
  static async buscarTodasPessoas(req, res) {
    try {
      const todasPessoas = await database.Pessoas.findAll()
      return res.status(200).json(todasPessoas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async buscarPessoa(req, res) {
    const { id } = req.params
    try {
      const buscarPessoa = await database.Pessoas.findOne({
        where: { id: Number(id) }
      })
      if (buscarPessoa) {
        return res.status(200).json(buscarPessoa)
      } else {
        return res.status(404).json('Usuario não encontrado!')
      }
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async inserirPessoa(req, res) {
    const novaPessoa = req.body
    try {
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
      if (novaPessoaCriada) {
        return res.status(200).json({
          message: 'Usuario inserido com sucesso',
          data: novaPessoaCriada
        })
      } else {
        return res.status(500).json({ message: 'Erro ao inserir usuario!' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async atualizaPessoa(req, res) {
    const { id } = req.params
    const novasInfos = req.body
    try {
      await database.Pessoas.update(novasInfos, { where: { id: Number(id) } })
      const pessoasAtualizada = await database.Pessoas.findOne({
        where: { id: Number(id) }
      })
      if (pessoasAtualizada) {
        return res.status(200).json(pessoasAtualizada)
      } else {
        return res.status(404).json('Erro ao atualizar usuario')
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async deletarPessoa(req, res) {
    const { id } = req.params
    try {
      await database.Pessoas.destroy({
        where: { id: Number(id) }
      })
      return res.status(200).json({ message: `id ${id} deletado` })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
module.exports = PessoaController
