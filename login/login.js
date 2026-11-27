const loginForm = document.querySelector("#loginForm");

const emailInput = document.querySelector("#email");
const senhaInput = document.querySelector("#senha");

const mensagem = document.querySelector("#mensagem");

loginForm.addEventListener("submit", (event) => {
    
    event.preventDefault();

    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    const sucesso = pegarUsuario(senha,email);

    if (!sucesso) {

        mensagem.textContent = "E-mail ou senha incorretos!";
        return;

    }

    // Salva o usuário atual
    localStorage.setItem("usuarioLogado", email);

    // Redireciona para o site
    window.location.href = "../index.html";

});
