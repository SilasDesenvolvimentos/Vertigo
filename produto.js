const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
const parametros = new URLSearchParams(window.location.search);

const id_produto = Number(parametros.get("id"));

const produto = produtos.find(p => p.id === id_produto);

const nome_produto = produto.nome
const preco_produto = produto.preco
const data_produto = produto.data
const categoria_produto = produto.categoria
const img_produto = produto.imagem

document.querySelector("#nomeProduto").textContent = nome_produto
document.querySelector("#precoProduto").textContent = preco_produto.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
document.querySelector("#idProduto").textContent = id_produto
document.querySelector("#dataProduto").textContent = data_produto
document.querySelector("#categoriaProduto").textContent = categoria_produto

document.querySelector("#imagemProduto").src = "../img/estampas/"+img_produto
