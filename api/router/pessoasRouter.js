const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router
  .get('/pessoas', PessoaController.buscarPessoasAtivas)
  .get('/pessoas/todos', PessoaController.buscarTodasPessoas)
  .get('/pessoas/:id', PessoaController.buscarPessoa)
  .post('/pessoas', PessoaController.inserirPessoa)
  .post(  '/pessoas/:id/restaura/',  PessoaController.restauraPessoa)
  .put('/pessoas/:id', PessoaController.atualizaPessoa)
  .delete('/pessoas/:id', PessoaController.deletarPessoa)

//Matriculas rotas
router
  .get(  '/pessoas/:estudanteId/matricula/:matriculaId',  PessoaController.buscarUmaMatricula)
  .get(  '/pessoas/:estudanteId/matricula/',  PessoaController.pegaMatriculas)
  .get(  '/pessoas/:matricula/:turmaId/confirmadas',  PessoaController.pegaMatriculasPorTurma)
  .get(  '/pessoas/:matricula/lotada',  PessoaController.pegaTurmasLotadas)
  .post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)
  .post(  '/pessoas/:estudanteId/matricula/:matriculaId/restaura',  PessoaController.restauraMatricula)
  .put(  '/pessoas/:estudanteId/matricula/:matriculaId',  PessoaController.atualizaMatricula)
  .delete(  '/pessoas/:estudanteId/matricula/:matriculaId',  PessoaController.deletarMatricula)


module.exports = router
