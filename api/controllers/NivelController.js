const database = require('../models')

class NivelController {
  static async pegaTodosOsNiveis(req, res) {
    try {
      const todosOsNiveis = await database.Niveis.findAll()
      return res.status(200).json(todosOsNiveis)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async pegaUmNivel(req, res) {
    const { id } = req.params
    try {
      const buscarUmNivel = await database.Niveis.findOne({
        where: { id: Number(id) }
      })
      return res.status(200).json(buscarUmNivel)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async criaNivel(req, res) {
    const novoNivel = req.body
    try {
      const novoNivelCriado = await database.Niveis.create(novoNivel)

      return res.status(200).json({
        message: 'Nivel inserido com sucesso',
        data: novoNivelCriado
      })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
  static async atualizaNivel(req, res) {
    const { id } = req.params
    const nivelInfos = req.body
    try {
      await database.Niveis.update(nivelInfos, { where: { id: Number(id) } })
      const novoNivel = await database.Niveis.findOne({
        where: { id: Number(id) }
      })
      if (novoNivel) {
        return res.status(200).json(novoNivel)
      } else {
        return res.status(404).json('Erro ao atualizar usuario')
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
  static async apagaNivel(req, res) {
    const { id } = req.params
    try {
      await database.Niveis.destroy({
        where: { id: Number(id) }
      })
      return res.status(200).json({ message: `id ${id} deletado` })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
  static async restauraNivel(req, res) {
    const { id } = req.params
    try {
      await database.Niveis.restore( {where: { id: Number(id) } } )
      return res.status(200).json({ mensagem: `id ${id} restaurado`})
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = NivelController
