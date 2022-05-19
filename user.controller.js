const User = {
  get: (req, res) => {
    res.status(200).send('Get')
  },
  list: (req, res) => {
    res.status(200).send('List')
  },
  create: (req, res) => {
    res.status(201).send('Create')
  },
  update: (req, res) => {
    res.sendStatus(204)
  },
  delete: (req, res) => {
    res.sendStatus(204)
  }
}

module.exports = User
