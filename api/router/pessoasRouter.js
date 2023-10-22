const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router
  .get('/pessoas', PessoaController.buscarTodasPessoas)
  .get('/pessoas/:id', PessoaController.buscarPessoa)
  .post('/pessoas', PessoaController.inserirPessoa)
  .put('/pessoas/:id', PessoaController.atualizaPessoa)
  .delete('/pessoas/:id', PessoaController.deletarPessoa)

//Matriculas rotas
router
  .get(  '/pessoas/:estudanteId/matricula/:matriculaId',  PessoaController.buscarUmaMatricula)
  .post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)
  .put(  '/pessoas/:estudanteId/matricula/:matriculaId',  PessoaController.atualizaMatricula)
  .delete(  '/pessoas/:estudanteId/matricula/:matriculaId',  PessoaController.deletarMatricula)


module.exports = router
