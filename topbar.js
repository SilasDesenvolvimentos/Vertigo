const topbar = `
    <header class="top-bar">
        <div class="top-bar-inter">
            <a class="logo" href="./index.html">Vertigo</a>
            <div class="top-bar-opcoes">
                <a href="#destaques">Destaques</a>
                <a href="#catalogo">Catálogo</a>
            </div>
            <div class="pesquisa-container">

                <input
                    type="search"
                    id="nome"
                    name="nome"
                    placeholder="O que você gostaria?"
                    class="barra-pesquisa"
                >

                <a type="button" id="botao-pesquisa" class="pesquisa-botao" href="#catalogo">
                    <img class="icon-pesquisa" src="img/icon_lupa.png">
                </a>

            </div>
            <div class="top-bar-opcoes">
                <button href="#comprar" class="icon-button" id="carrinho-botao">
                    <img src="img/icon_compra.png">
                </button>
                <div class="dropdown-usuario">
                    <button type="button" class="icon-button" id="usuario-botao">
                        <img src="img/icon_user.png">
                    </button>

                    <div class="dropdown-conteudo" id="usuario-menu">
                        <a href="./signup/index.html" id="botao-logout">Sair</a>
                    </div>

                </div>
                <a href="login/index.html" id="entrar-botao">
                    ENTRAR
                </a>
            </div>
        </div>
    </header>
`;

document.getElementById('topBar').innerHTML = topbar;

// ========================================
// BOTÕES SUPERIORES
// ========================================

if(localStorage.getItem("usuarioLogado") === "")
{
    document.querySelector("#entrar-botao").style.display = "block";
    document.querySelector("#usuario-botao").style.display = "none";
    document.querySelector("#carrinho-botao").style.display = "none";
}else
{
    document.querySelector("#entrar-botao").style.display = "none";
    document.querySelector("#usuario-botao").style.display = "block";
    document.querySelector("#carrinho-botao").style.display = "block";
}


// ========================================
// DROPDOWN DO USUÁRIO
// ========================================

const usuarioDropdown = document.querySelector(".dropdown-usuario");
const usuarioBotao = document.querySelector("#usuario-botao");
const botaoLogout = document.querySelector("#botao-logout");

usuarioBotao.addEventListener("click", () => {
    usuarioDropdown.classList.toggle("aberto");
});

// Fechar ao clicar fora
document.addEventListener("click", (event) => {

    if (!usuarioDropdown.contains(event.target)) {
        usuarioDropdown.classList.remove("aberto");
    }

});

// Logout
botaoLogout.addEventListener("click", (event) => {

    event.preventDefault();

    localStorage.setItem("usuarioLogado", "");

    window.location.href = "./index.html";

});