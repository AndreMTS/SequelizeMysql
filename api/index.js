const express = require('express')
const router = require('./router/index.js')

const app = express()
const port = 3000

router(app)

app.listen(port, () => {
  return console.log(`listening on porta ${port} http://localhost:${port}`)
})

module.exports = app
