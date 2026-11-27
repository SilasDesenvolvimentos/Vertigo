// ========================================
// SISTEMA DE USUÁRIOS
// ========================================

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function salvarUsuarios() {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


// ========================================
// CRIAR USUÁRIO
// ========================================

function criarUsuario(nome, senha, email) {

    if (usuarios.some(usuario => usuario.email === email)) {
        return false;
    }

    usuarios.push({
        nome: nome,
        senha: senha,
        email: email,
        carrinho: []
    });

    salvarUsuarios();

    return true;
}


// ========================================
// REMOVER USUÁRIO
// ========================================

function removerUsuario(email) {

    const tamanhoInicial = usuarios.length;

    usuarios = usuarios.filter(usuario => usuario.email !== email);

    if (usuarios.length === tamanhoInicial) {
        console.log("Usuário não encontrado!");
        return false;
    }

    salvarUsuarios();

    return true;
}

// ========================================
// PEGAR USUÁRIO
// ========================================

function pegarUsuario(senha,email) {

    if (usuarios.some(usuario => usuario.email === email && usuario.senha === senha)) {
        return true;
    }
    return false;
}


