
let carrinhoTabela = document.getElementById("carrinhoTabela");
let totalElemento = document.getElementById("total");

// Pega o email do usuário logado
let emailUsuario = localStorage.getItem("usuarioLogado");

// Recupera a tabela de usuários
function pegarUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

// Pega o usuário atual
function pegarUsuario() {
    let usuarios = pegarUsuarios();

    return usuarios.find(usuario => usuario.email === emailUsuario);
}

// Pega o carrinho do usuário atual
function pegarCarrinho() {
    let usuario = pegarUsuario();

    return usuario?.carrinho || [];
}

// Salva o carrinho do usuário atual
function salvarCarrinho(carrinho) {
    let usuarios = pegarUsuarios();

    let usuario = usuarios.find(usuario => usuario.email === emailUsuario);

    if (!usuario) return;

    usuario.carrinho = carrinho;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function formatarPreco(preco) {
    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function atualizarCarrinho() {
    let carrinho = pegarCarrinho();

    carrinhoTabela.innerHTML = "";

    let total = 0;

    carrinho.forEach(item => {
        total += item.preco;

        carrinhoTabela.insertAdjacentHTML("beforeend", `
            <tr>
                <td class="produto">
                    <button class="erase" data-id="${item.id}">
                        X
                    </button>

                    <div class="produto-imagem-container">
                        <img class="roupa-base" src="../img/roupa_base_cor.png">
                        <img class="roupa-estampa" src="../img/estampas/${item.imagem}">
                        <img class="roupa-base" src="../img/roupa_cima.png">
                    </div>

                    <div class="separator" style="margin-right:10px"></div>
                    <h3 class="produto-nome">${item.nome}</h3>
                </td>

                <td><b>${formatarPreco(item.preco)}</b></td>
            </tr>
        `);
    });

    totalElemento.textContent = formatarPreco(total);
}

// Apagar produto
carrinhoTabela.addEventListener("click", event => {
    let botao = event.target.closest(".erase");

    if (!botao) return;

    let carrinho = pegarCarrinho();

    carrinho = carrinho.filter(
        item => item.id != botao.dataset.id
    );

    salvarCarrinho(carrinho);

    atualizarCarrinho();
});

// Carregar tabela
if(localStorage.getItem("usuarioLogado") === "" )
{
    window.location.href = "../login/index.html"
}else
{
    atualizarCarrinho();
}

