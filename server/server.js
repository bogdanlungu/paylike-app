const chalk = require('chalk')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const routes = require('./routes')
const { PORT } = require('./constants')


/*** Init express
****/
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


/*** The routes
****/
app.use('/api', routes)


/*** Serve static
****/
app.use(express.static('public'))

app.get('*', (req, res) => res.sendFile(path.join(`${__dirname}/../public/index.html`)))


/*** Start app
****/
const server = app.listen(PORT, () => {

  const port = server.address().port

  console.log('\nserver running at:')
  console.log('  ' + chalk.cyan(`http://localhost:${port}\n`))

})
