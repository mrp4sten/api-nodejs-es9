const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mrp4sten:mrp4sten@firstcompletenodeapp.ch50k.mongodb.net/?retryWrites=true&w=majority')

const User = mongoose.model('User', {
    username: String,
    age: Number
})

const create = async () => {
    const user = new User({ username: 'moris', age: 20 })
    const savedUser = await user.save()
    console.log(savedUser)
}

const searchAll = async () => {
    const users = await User.find();
    console.log(users)
}

const search = async () => {
    const user = await User.find({ username: 'mrp4sten' })
    console.log(user)
}

const searchOne = async () => {
    const user = await User.findOne({ username: 'mrp4sten' })
}

const update = async () => {
    const user = await User.findOne({ username: 'nena' })
    console.log(user)
    user.age = 40
    await user.save()
}

const deleteUser = async () => {
    const user = await User.findOne({ username: 'nena'})
    await user.remove()
}

searchAll()