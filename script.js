
const pesquisaInput = document.querySelector("#nome");
const botaoPesquisa = document.querySelector("#botao-pesquisa");
// ========================================
// PARALLAX
// ========================================

window.addEventListener("scroll", () => {
    const scroll = window.scrollY;

    document.body.style.backgroundPositionY = `${scroll * 0.5}px`;

    parallaxes.forEach(element => {
        const speed = 0.3;
        element.style.transform = `translateY(${scroll * speed}px)`;
    });
});

const parallaxes = document.querySelectorAll(".parallax");


// ========================================
// SLIDER DE PREÇO
// ========================================

const minInput = document.querySelector("#preco-min");
const maxInput = document.querySelector("#preco-max");

const minLabel = document.querySelector("#valor-min");
const maxLabel = document.querySelector("#valor-max");

const progress = document.querySelector(".range-progress");

const space = 20;
const minLimit = 50;
const maxLimit = 300;

function updateRange() {

    let min = Number(minInput.value);
    let max = Number(maxInput.value);

    if (minInput.matches(":active")) {

        min = Math.min(min, maxLimit - space);
        max = Math.max(max, min + space);

        minInput.value = min;
        maxInput.value = max;

    } else {

        max = Math.max(max, minLimit + space);
        min = Math.min(min, max - space);

        minInput.value = min;
        maxInput.value = max;
    }

    const minPercent = ((min - minLimit) / (maxLimit - minLimit)) * 100;
    const maxPercent = ((max - minLimit) / (maxLimit - minLimit)) * 100;

    progress.style.left = `${minPercent}%`;
    progress.style.width = `${maxPercent - minPercent}%`;

    minLabel.textContent = min.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    maxLabel.textContent = max.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    atualizarCatalogo();
}

minInput.addEventListener("input", updateRange);
maxInput.addEventListener("input", updateRange);


// ========================================
// PRODUTOS E LOCAL STORAGE
// ========================================

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function adicionarProduto(nome, img, preco, data, categoria) {

    produtos.push({
        id: produtos.length,
        nome: nome,
        imagem: img,
        preco: preco,
        data: data,
        categoria: categoria
    });

    salvarProdutos();
}


// ========================================
// CRIAÇÃO DOS CARDS
// ========================================

function adicionarProdutoCard(onde, id) {

    let produto = produtos.find(p => p.id === id);

    if (!produto) return;

    onde.insertAdjacentHTML("beforeend", `
        <div class="produto-container" data-id="${produto.id}">
            <div class="produto-imagem-container">
                <img class="roupa-base" src="img/roupa_base_cor.png">
                <img class="roupa-estampa" src="img/estampas/${produto.imagem}">
                <img class="roupa-base" src="img/roupa_cima.png">
            </div>

            <b>${produto.nome}</b>

            <p>
                ${produto.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            </p>
        </div>
    `);
}
document.addEventListener("click", (event) => {

    const card = event.target.closest(".produto-container");

    if (!card) return;

    const id = card.dataset.id;

    window.location.href = `produto/index.html?id=${id}`;

});

// ========================================
// PRODUTOS INICIAIS
// ========================================

if (produtos.length === 0) {

    adicionarProduto(
        "Vingadores Ultimato",
        "avengers.png",
        189.90,
        "2026-03-17",
        "estampa"
    );

    adicionarProduto(
        "Frieren",
        "frieren.png",
        79.90,
        "2026-11-12",
        "estampa"
    );

    adicionarProduto(
        "Besto friendo (Jujutsu Kaisen)",
        "bestofriendo.png",
        129.90,
        "2026-07-23",
        "estampa"
    );

    adicionarProduto(
        "Pare de ficar lendo frases na camiseta dos outros",
        "paredeficarlendo.png",
        59.90,
        "2026-01-08",
        "frase"
    );

    adicionarProduto(
        "Rurouni Kenshin",
        "rurouni.png",
        249.90,
        "2026-09-04",
        "estampa"
    );
    
}


// ========================================
// ELEMENTOS DO CATÁLOGO
// ========================================

const itens_destaques = document.getElementById("itens-destaques");
const itens_catalogo = document.getElementById("itens-catalogo");


// ========================================
// DESTAQUES
// ========================================

[0, 1, 2, 3, 4, 5].forEach(id => {
    adicionarProdutoCard(itens_destaques, id);
});


// ========================================
// ELEMENTOS DOS FILTROS
// ========================================

const ordenacao = document.querySelectorAll(
    '.lista-opcoes input[type="radio"]'
);

const categorias = document.querySelectorAll(
    '.lista-opcoes input[type="checkbox"]'
);


// ========================================
// FILTRAGEM E ORDENAÇÃO
// ========================================

function atualizarCatalogo() {

    // Copia os produtos originais
    let produtosFiltrados = [...produtos];


    // ------------------------------------
    // FILTRO DE PREÇO
    // ------------------------------------

    const precoMin = Number(minInput.value);
    const precoMax = Number(maxInput.value);

    produtosFiltrados = produtosFiltrados.filter(produto => {

        return produto.preco >= precoMin &&
               produto.preco <= precoMax;

    });


    // ------------------------------------
    // FILTRO DE CATEGORIA
    // ------------------------------------

    const categoriasSelecionadas = [...categorias]
        .filter(input => input.checked)
        .map(input => input.value);

    if (categoriasSelecionadas.length > 0) {

        produtosFiltrados = produtosFiltrados.filter(produto => {

            return categoriasSelecionadas.includes(produto.categoria);

        });

    }

    // ========================================
    // FILTRO DE PESQUISA
    // ========================================

    const pesquisa = pesquisaInput.value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    produtosFiltrados = produtosFiltrados.filter(produto => {

        const nome = produto.nome
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        return nome.includes(pesquisa);

    });

    // ------------------------------------
    // ORDENAÇÃO
    // ------------------------------------

    const opcao = document.querySelector(
        '.lista-opcoes input[type="radio"]:checked'
    );

    if (opcao) {

        switch (opcao.value) {

            case "1": // Menor preço

                produtosFiltrados.sort((a, b) => {
                    return a.preco - b.preco;
                });

                break;


            case "2": // Maior preço

                produtosFiltrados.sort((a, b) => {
                    return b.preco - a.preco;
                });

                break;


            case "3": // Mais recentes

                produtosFiltrados.sort((a, b) => {
                    return new Date(b.data) - new Date(a.data);
                });

                break;


            case "4": // Mais antigos

                produtosFiltrados.sort((a, b) => {
                    return new Date(a.data) - new Date(b.data);
                });

                break;

        }

    }


    // ------------------------------------
    // ATUALIZAÇÃO DO CATÁLOGO
    // ------------------------------------

    itens_catalogo.innerHTML = "";

    produtosFiltrados.forEach(produto => {

        adicionarProdutoCard(itens_catalogo, produto.id);

    });

}


// ========================================
// EVENTOS DOS FILTROS
// ========================================

// Categorias
categorias.forEach(input => {

    input.addEventListener("change", atualizarCatalogo);

});


// Ordenação
ordenacao.forEach(input => {

    input.addEventListener("change", atualizarCatalogo);

});


// ========================================
// INICIALIZAÇÃO
// ========================================

updateRange();


// Pesquisa ao digitar
pesquisaInput.addEventListener("input", atualizarCatalogo);

if(localStorage.getItem("usuarioLogado") === null)
{
    localStorage.setItem("usuarioLogado","");
}


// ========================================
// EVENTOS DA PESQUISA
// ========================================

function pesquisar() {
    atualizarCatalogo();

    document.querySelector("#catalogo").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Pesquisa ao clicar na lupa
botaoPesquisa.addEventListener("click", pesquisar);

// Pesquisa ao apertar Enter
pesquisaInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        pesquisar();
    }
});