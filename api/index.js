const express = require('express')
const routes = require('./routes')

const app = express()
const port = 3000

routes(app)

app.listen(port, () => {
  return console.log(`listening on porta ${port} http://localhost:${port}`)
})

module.exports = app