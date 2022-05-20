const express = require('express')
const mongoose = require('mongoose')
const user = require('./user.controller')
const app = express()
const PORT = 3000

app.use(express.json())
mongoose.connect('mongodb+srv://mrp4sten:mrp4sten@firstcompletenodeapp.ch50k.mongodb.net/?retryWrites=true&w=majority')

app.use(express.static('public/static'))

app.get('/users', user.list)
app.get('/users/:id', user.get)
app.post('/users/', user.create)
app.put('/users/:id', user.update)
app.patch('/users/:id', user.update)
app.delete('/users/:id', user.delete)

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
})

app.get('*', (req, res) => {
  res.status(404).send('Page not found')
})

app.post('*', (req, res) => {
  res.status(404).send('Page not found')
})

app.listen(PORT, () => {
  console.log(`Listen on port: ${PORT}`)
})
