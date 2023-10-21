const express = require('express')
const bodyparser = require('body-parser')


const app = express()

app.use(bodyparser.json())

const port = 3000

app.get('/teste', (req, res) => {
    res.status(200).send({ mensagem: 'Bem vindo a API' })
})

app.listen(port, () => {
    return console.log(`listening on porta ${port} http://localhost:${port}`)
})

module.exports = app