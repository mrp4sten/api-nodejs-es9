const express = require('express')
const user = require('./user.controller')
const app = express()
const PORT = 3000

app.get('/', user.list)
app.get('/:id', user.get)
app.post('/', user.create)
app.put('/:id', user.update)
app.patch('/:id', user.update)
app.delete('/:id', user.delete)

app.get('*', (req, res) => {
  res.status(404).send('Page not found')
})

app.post('*', (req, res) => {
  res.status(404).send('Page not found')
})

app.listen(PORT, () => {
  console.log(`Listen on port: ${PORT}`)
})
