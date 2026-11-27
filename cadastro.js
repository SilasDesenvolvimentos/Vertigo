const cadastroForm = document.querySelector("#cadastroForm");

const nomeInput = document.querySelector("#nome");
const emailInput = document.querySelector("#email");
const senhaInput = document.querySelector("#senha");

const mensagem = document.querySelector("#mensagem");

cadastroForm.addEventListener("submit", (event) => {
    
    event.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value;

    // Cria o usuário
    const sucesso = criarUsuario(nome, senha, email);

    if (!sucesso) {

        mensagem.textContent = "Este e-mail já está cadastrado!";
        return;

    }

    // Salva o usuário atual
    localStorage.setItem("usuarioLogado", email);

    // Redireciona para o site
    window.location.href = "../index.html";

});