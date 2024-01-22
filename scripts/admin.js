document.addEventListener("DOMContentLoaded", () => {
    listarUsuarios();
    document.getElementById("card-container").addEventListener("click", (event) => {
        const target = event.target;
        if (target.tagName === "BUTTON" && target.classList.contains("edit-button")) {
            const userId = target.dataset.userId;
            editarUsuario(userId);
        } else if (target.tagName === "BUTTON" && target.classList.contains("delete-button")) {
            const userId = target.dataset.userId;
            excluirUsuario(userId);
        }
    });
});

async function listarUsuarios() {
    try {
        const response = await fetch("http://localhost:3000/users");
        const users = await response.json();

        const cardContainer = document.getElementById("card-container");

        cardContainer.innerHTML = "";

        users.forEach((user) => {
            // if(user.role === 'admin'){ QUANDO FILTRA O USUÁRIO, A EDIÇÃO NÃO FUNCIONA CORRETAMENTE
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <h2>${user.username}</h2>
                <p>Email: ${user.email}</p>
                <p>Role: ${user.role}</p>
                <button class="edit-button" data-user-id="${user.id}">Editar</button>
                <button class="delete-button" data-user-id="${user.id}">Excluir</button>
            `;

            cardContainer.appendChild(card);
            // }
        });
    } catch (error) {
        console.error("Erro ao obter a lista de usuários:", error);
    }
}

async function editarUsuario(userId) {
    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        const userData = await response.json();

        const novoUsername = prompt("Novo nome de usuário:", userData.username);
        const novoEmail = prompt("Novo email:", userData.email);

        if (!isValidEmail(novoEmail)) {
            alert("Por favor, insira um endereço de email válido.");
            return;
        }

        const respostaAtualizacao = await fetch(`http://localhost:3000/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: novoUsername, email: novoEmail })
        });

        if (respostaAtualizacao.ok) {
            alert("Usuário atualizado com sucesso!");
            listarUsuarios();
        } else {
            alert("Erro ao atualizar usuário.");
        }
    } catch (error) {
        console.error("Erro ao editar usuário:", error);
    }
}

async function excluirUsuario(userId) {
    try {
        const confirmacao = confirm("Tem certeza de que deseja excluir este usuário?");

        if (!confirmacao) {
            return;
        }

        const respostaExclusao = await fetch(`http://localhost:3000/users/${userId}`, {
            method: "DELETE"
        });

        if (respostaExclusao.ok) {
            alert("Usuário excluído com sucesso!");
            listarUsuarios();
        } else {
            alert("Erro ao excluir usuário.");
        }
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
