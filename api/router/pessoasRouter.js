const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.buscarTodasPessoas)

router.get('/pessoas/:id', PessoaController.buscarPessoa)

router.post('/pessoas', PessoaController.inserirPessoa)

router.put('/pessoas/:id', PessoaController.atualizaPessoa)

router.delete('/pessoas/:id', PessoaController.deletarPessoa)

module.exports = router
