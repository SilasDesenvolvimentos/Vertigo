var topBar = document.getElementById('topBar')



const distance = topBar.getAttribute("distance")

const topbarhtml = `
    <header class="top-bar">
        <div class="top-bar-inter">
            <a class="logo" href="${distance}/index.html">Vertigo</a>
            <div class="top-bar-opcoes">
                <a href="${distance}/index.html#destaques">Destaques</a>
                <a href="${distance}/index.html#catalogo">Catálogo</a>
            </div>
            <div class="pesquisa-container">

                <input
                    type="search"
                    id="nome"
                    name="nome"
                    placeholder="O que você gostaria?"
                    class="barra-pesquisa"
                >

                <a type="button" id="botao-pesquisa" class="pesquisa-botao">
                    <img class="icon-pesquisa" src="${distance}/img/icon_lupa.png">
                </a>

            </div>
            <div class="top-bar-opcoes">
                <a href="${distance}/carrinho/index.html" class="icon-button" id="carrinho-botao" >
                    <img src="${distance}/img/icon_compra.png">
                </a>
                <div class="dropdown-usuario">
                    <button type="button" class="icon-button" id="usuario-botao">
                        <img src="${distance}/img/icon_user.png">
                    </button>

                    <div class="dropdown-conteudo" id="usuario-menu">
                        <a href="${distance}/signup/index.html" id="botao-logout">Sair</a>
                    </div>

                </div>
                <a href="${distance}/login/index.html" id="entrar-botao">
                    ENTRAR
                </a>
            </div>
        </div>
    </header>
`;

document.getElementById('topBar').innerHTML = topbarhtml;
const pesquisaInput = document.querySelector("#nome");
const botaoPesquisa = document.querySelector("#botao-pesquisa");
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

    window.location.href = "index.html";

});

// ========================================
// EVENTOS DA PESQUISA
// ========================================

function irParaCatalogo() {
    window.location.href = `${distance}/index.html?search=${pesquisaInput.value.trim()}#catalogo`;
}
function atualizarURLpesquisa() {
    if(distance == ".")
    {
        history.pushState(null, "",`?search=${pesquisaInput.value.trim()}`);
    }
        
}
// Pesquisa ao clicar na lupa
botaoPesquisa.addEventListener("click", irParaCatalogo);

// Pesquisa ao apertar Enter
pesquisaInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        irParaCatalogo()
    }
});

pesquisaInput.addEventListener("input", atualizarURLpesquisa);
