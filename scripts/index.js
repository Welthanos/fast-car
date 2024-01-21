async function userRegister(event) {
    event.preventDefault();

    const newUsername = document.getElementById("newUsername").value;
    const newEmail = document.getElementById("newEmail").value;
    const newPassword = document.getElementById("newPassword").value;

    try{
    const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: newUsername, email: newEmail, password: newPassword })
    });

    if (response.ok) {
        alert("Usuário cadastrado com sucesso");
        window.location.href = "../pages/login.html";

        const users = await response.json();
    } 
    else{
        throw new Error("Erro na solicitação");
    } 
}catch (error) {
        alert("Erro ao cadastrar usuário");
    }
}

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();

    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        window.location.href = "../pages/home.html";
    } else {
        alert("Usuário ou senha inválidos");
    }
}

