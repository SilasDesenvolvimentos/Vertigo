const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
const parametros = new URLSearchParams(window.location.search);

const id_produto = Number(parametros.get("id"));

const produto = produtos.find(p => p.id === id_produto);

if (!produto) {
    alert("Produto não encontrado!");
} else {
    const nome_produto = produto.nome;
    const preco_produto = produto.preco;
    const data_produto = produto.data;
    const categoria_produto = produto.categoria;
    const img_produto = produto.imagem;

    document.querySelector("#nomeProduto").textContent = nome_produto;

    document.querySelector("#precoProduto").textContent =
        preco_produto.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    document.querySelector("#idProduto").textContent = id_produto;
    document.querySelector("#dataProduto").textContent = data_produto;
    document.querySelector("#categoriaProduto").textContent = categoria_produto;

    document.querySelector("#imagemProduto").src =
        "../img/estampas/" + img_produto;

    function adicionarAoCarrinho() {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        let email = localStorage.getItem("usuarioLogado");

        let usuario = usuarios.find(usuario => usuario.email === email);

        if (!usuario) {
            window.location.href = "../login/index.html"
            return;
        }

        if (!usuario.carrinho) {
            usuario.carrinho = [];
        }

        usuario.carrinho.push({
            id: Date.now() + Math.random(),
            imagem: img_produto,
            nome: nome_produto,
            preco: preco_produto
        });

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert(`"${nome_produto}" adicionado ao carrinho!`);
    }

    let adCarrinho = document.getElementById("adCarrinho");

    adCarrinho.addEventListener("click", adicionarAoCarrinho);
}
