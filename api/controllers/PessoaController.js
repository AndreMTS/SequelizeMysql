const database = require('../models')
const Sequelize = require('sequelize')

class PessoaController {
  static async buscarPessoasAtivas(req, res) {
    try {
      const pessoasAtivas = await database.Pessoas.findAll()
      return res.status(200).json(pessoasAtivas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async buscarTodasPessoas(req, res) {
    try {
      const todasPessoas = await database.Pessoas.scope('todos').findAll()
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

  static async restauraPessoa(req, res) {
    const { id } = req.params
    try {
      await database.Pessoas.restore({ where: { id: Number(id) } })

      return res.status(200).json({ message: `id ${id} restaurado` })
    
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  /* -- Rota de matriculas -- */

  static async buscarUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      const umaMatricula = await database.Matriculas.findOne({
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) }
      })
      return res.status(200).json(umaMatricula)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
    try {
      const novaMatriculaCriada = await database.Matriculas.create(
        novaMatricula
      )

      return res.status(200).json({
        message: 'Matricula criada com sucesso!',
        data: novaMatriculaCriada
      })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async atualizaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    const novasInfos = req.body
    try {
      await database.Matriculas.update(novasInfos, { where: { id: Number(matriculaId), estudante_id: Number(estudanteId) } })
      const MatriculasAtualizada = await database.Matriculas.findOne({where: { id: Number(matriculaId) } })
      return res.status(200).json(MatriculasAtualizada)
    }
    catch (error) { 
      return res.status(500).json({ message: error.message }) 
    }
  }

  static async deletarMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try { await database.Matriculas.destroy({ where: { id: Number(matriculaId), estudante_id: Number(estudanteId) } })
      return res.status(200).json({ message: `${matriculaId} foi deletado` })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async restauraMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      await database.Matriculas.restore({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      return res.status(200).json({ mensagem: `id ${matriculaId} restaurado`})
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaMatriculas( req, res) {
    const { estudanteId } = req.params
    try {
      const pessoa = await database.Pessoas.findOne({ where: {id:(estudanteId) } } )
      const matriculas = await pessoa.getAulasMatriculadas()
      return res. status(200).json(matriculas)
    }
    catch (error){
      return res.status(500).json(error.message)}
  }

  static async pegaMatriculasPorTurma( req, res) {
    const { turmaId } = req.params
    try {
      const todasAsMatriculas = await database.Matriculas
        .findAndCountAll({ 
          where: {
            turma_id:( Number(turmaId) ),
            status: 'confirmado'
          },
          limit: 20,
          order: [['estudante_id', 'asc']]
        })

      return res. status(200).json(todasAsMatriculas)
    }
    catch (error){
      return res.status(500).json(error.message)}
  }

  static async pegaTurmasLotadas( req, res) {
    const turmaLotada = 2
    try {
      const turmaLotadas = await database.Matriculas
        .findAndCountAll({ 
          where: {
            status: 'confirmado',
          },
          attributes: ['turma_id'],
          group: ['turma_id'],
          having: Sequelize.literal(`count(turma_id) >= ${turmaLotada} `)
        })

      return res. status(200).json(turmaLotadas.count)
    }
    catch (error){
      return res.status(500).json(error.message)}
  }
}

module.exports = PessoaController


