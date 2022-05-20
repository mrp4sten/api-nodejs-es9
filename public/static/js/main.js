const loadInitialTemplate = () => {
    const template = `
        <section id="alerts"></section>
        <section class="d-flex justify-content-center">
            <form class="card border-primary m-3 w-50" id="user-form">
                <div class="card-header">
                    <h2>Users</h2>
                </div>
                <div class="card-body">
                    <div>
                        <label>Name:</label>
                        <input 
                            class="form-control w-50" 
                            type="text" 
                            name="name"
                            placeholder="Name here">
                        </input>
                    <div>
                    <div>
                        <label>Lastname:</label>
                        <input 
                            class="form-control 
                            w-50" type="text" 
                            name="lastname"
                            placeholder="Name here">
                        </input>
                    <div>
                    <button 
                        class="btn btn-primary mt-2" 
                        type="submit">
                    Send
                    </button>
                </div>
            </form>

            <table class="table mt-4">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody id="users-list">
                </tbody>
            </table>
        <section>
    `

    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = template
}

const loadAlert = (title, message) => {
    const template = `
        <div class="alert alert-dismissible alert-warning" id="alert">
        </div>
    `
    const alerts = document.getElementById('alerts')
    alerts.innerHTML = template

    const alert = document.getElementById('alert')

    alert.innerHTML = `
        <button 
            type="button" 
            class="btn-close" 
            data-bs-dismiss="alert">
        </button>
        <strong>${title}: </strong>${message}
    `
}

const getUsers = async () => {
    const res = await fetch('/users')
    const users = await res.json()
    const template = (user) => `
        <tr>
            <td>${user.name}</td>
            <td>${user.lastname}</td>
            <td>
                <button 
                    data-id="${user._id}" 
                    type="button" 
                    class="btn btn-danger">
                Delete
                </button>
            </td>
        </tr>
    `

    const tbody = document.getElementById('users-list')
    tbody.innerHTML = users.map(user => template(user)).join('')
    users.forEach(user => {
        const userNode = document.querySelector(`[data-id="${user._id}"]`)
        userNode.onclick = async (e) => {
            await fetch(`/users/${user._id}`, {
                method: 'DELETE'
            })
            userNode.parentNode.parentNode.remove()
            loadAlert('Success', 'User deleted successfully')
        }
    })
}

const addFormListener = () => {
    const userForm = document.getElementById('user-form')
    userForm.onsubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(userForm)
        const data = Object.fromEntries(formData.entries())
        const res = await fetch('/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.ok) {
            loadAlert('Success', 'User created successfully')
        }

        userForm.reset()
        getUsers()
    }
}

loadInitialTemplate()
addFormListener()
getUsers()
