const register_button = document.getElementById('register');
const login_button = document.getElementById('login');

// Formulario Registro
const name_input = document.querySelector("#name");
const email_input = document.querySelector("#email");
const phone_input = document.querySelector("#phone");
const pass_input = document.querySelector("#pass");

// Formulario de Login
const email_login_input = document.querySelector("#email_login");
const pass_login_input = document.querySelector("#pass_login")

// Formulario de Actualizacion
const name_input_update = document.querySelector("#name_update");
const email_input_update = document.querySelector("#email_update");
const phone_input_update = document.querySelector("#phone_update");
const pass_input_update = document.querySelector("#pass_update");

let index_update = 0;

document.addEventListener('DOMContentLoaded', function() {

    // Get
    getUsers()

    register_button.addEventListener('click', (e) => {
        e.preventDefault();
        // Add dentro de localStorage
        const users = JSON.parse( localStorage.getItem("users") ) || [];

        console.log(users);

        const newUser = {
            // key  :   Value
            "name"  :   name_input.value,
            "email" :   email_input.value,
            "phone" :   phone_input.value,
            "pass"  :   pass_input.value
        }

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        getUsers()
    });

    login_button.addEventListener('click', (e) => {
        e.preventDefault();
        // Add dentro de localStorage
        const users = JSON.parse( localStorage.getItem("users") ) || [];

        const user = users.find( x => x.email === email_login_input.value );

        if (user) {
            
            // validar contraseña
            if (user.pass === pass_login_input.value) {
                alert("Bienvenido");
            } else {
                alert("credenciales incorrectas")
            }

        } else {
            alert("No existe el correo.")
        }
    })

});

function deleteUser(index) {
    const users = JSON.parse( localStorage.getItem("users") ) || [];
    users.splice(index, 1);

    localStorage.setItem('users', JSON.stringify(users));
    getUsers();
} 

function userUpdate() {
    const newUser = {
        // key  :   Value
        "name"  :   name_input_update.value,
        "email" :   email_input_update.value,
        "phone" :   phone_input_update.value,
        "pass"  :   pass_input_update.value
    }

    const users = JSON.parse( localStorage.getItem("users") ) || [];
    users.splice(index_update, 1, newUser);

    localStorage.setItem('users', JSON.stringify(users));

    getUsers()

    const form_update = document.getElementById("update");

    form_update.style.display = "none";

}

function formUpdate(index) {
    index_update = index;

    const users = JSON.parse( localStorage.getItem("users") ) || [];
    const user = users[index];

    name_input_update.value = user.name;
    email_input_update.value = user.email;
    phone_input_update.value = user.phone;
    pass_input_update.value = user.pass;

    const form_update = document.getElementById("update");

    form_update.style.display = "block";

}

function getUsers() {
    const users = JSON.parse( localStorage.getItem("users") ) || [];
    const content = document.querySelector("#content-table");

    content.innerHTML = "";

    for (let index = 0; index < users.length; index++) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${users[index].name}</td>
            <td>${users[index].email}</td>
            <td>${users[index].phone}</td>
            <td>
                <button onclick="deleteUser(${index})" type="button">Eliminar</button>
                <button onclick="formUpdate(${index})" type="button">Actualizar</button>
            </td>
        `;

        content.append(row)
    }
}
