const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router
  .get('/pessoas', PessoaController.buscarTodasPessoas)
  .get('/pessoas/:id', PessoaController.buscarPessoa)
  .post('/pessoas', PessoaController.inserirPessoa)
  .put('/pessoas/:id', PessoaController.atualizaPessoa)
  .delete('/pessoas/:id', PessoaController.deletarPessoa)
  .post(  '/pessoas/:id/restaura/',  PessoaController.restauraPessoa)

//Matriculas rotas
router
  .get(  '/pessoas/:estudanteId/matricula/:matriculaId',  PessoaController.buscarUmaMatricula)
  .post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)
  .put(  '/pessoas/:estudanteId/matricula/:matriculaId',  PessoaController.atualizaMatricula)
  .delete(  '/pessoas/:estudanteId/matricula/:matriculaId',  PessoaController.deletarMatricula)
  .post(  '/pessoas/:estudanteId/matricula/:matriculaId/restaura',  PessoaController.restauraMatricula)


module.exports = router
