const bodyparser = require('body-parser')
const pessoas = require('./pessoasRouter')

module.exports = (app) => {
  app.use(bodyparser.json())
  app.use(pessoas)
}
