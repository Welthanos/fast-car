function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


async function userRegister(event) {
    event.preventDefault();

    const newUsername = document.getElementById("newUsername").value;
    const newEmail = document.getElementById("newEmail").value;
    const newPassword = document.getElementById("newPassword").value;

    try {
    if (!isValidEmail(newEmail)) {
        alert("Por favor, insira um endereço de email válido.");
        return;
    }
    if (!newUsername || !newEmail || !newPassword) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

 
        const users = await fetch(`http://localhost:3000/users?email=${newEmail}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            // body: JSON.stringify({ email: newEmail })
        });

        if (!users.ok) {
            throw new Error("Erro ao cadastrar usuário");
        }

        const userExist = await users.json();

        if (userExist.length > 0) {
            alert("Email ja esta em uso");
        } else {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: newUsername, email: newEmail, password: newPassword })
            });

            if (response.ok) {
                alert("Usuário cadastrado com sucesso");

                setTimeout(() => {
                    window.location.href = "../pages/login.html";
                }, 0);
                
            } else {
                throw new Error("Erro na solicitação");
            }
        }
    } catch (error) {
        alert("Erro ao cadastrar usuário");
    }
}



async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();

    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        alert("Usuário ou senha inválidos");
    }

    if (user && user.role !== "admin") {
        window.location.href = "../pages/home.html";
    }
     else {
        window.location.href = "../pages/home-admin.html";
    }
}




