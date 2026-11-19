let carrinho = []

//função para adicionar os produtos
function adicionarProduto(nome,preco,quantidade = 1){

const produto = carrinho.find(item => item.nome == nome)
if(produto){
     produto.quantidade += quantidade
}else{
   carrinho.push({
    nome: nome,
    preco: preco,
    quantidade: quantidade
})

}
atualizarCarrinho()
}
//função de calculo dos itens no carrinho
function calculoTotal(){
    let total = 0

    for(let item of carrinho){
        total += item.preco * item.quantidade
    }
    return total
}

function removerProduto(nome){
const produto = carrinho.find(item => item.nome === nome)
if(!produto){
    return
}
if(produto.quantidade > 1){
    produto.quantidade--
}else{
    carrinho = carrinho.filter(item => item.nome !== nome)
}
atualizarCarrinho()
}
function esvaziarCarrinho(nome){
    carrinho = []
    atualizarCarrinho()
}
function aumentarQuantidade(nome){

    let produto = carrinho.find(item => item.nome === nome)

    if(produto){
        produto.quantidade++
    }
    atualizarCarrinho()

}
function atualizarCarrinho(){
     const lista = document.getElementById("listaCarrinho")
    lista.innerHTML = ""

    let total = 0

    carrinho.forEach(item => {

        const li = document.createElement("li")

        li.innerHTML = `
            ${item.nome} x${item.quantidade}
            - R$ ${item.preco * item.quantidade}

            <button onclick="aumentarQuantidade('${item.nome}')">+</button>

            <button onclick="removerProduto('${item.nome}')" style="color:red;">-</button>
        `

        lista.appendChild(li)

        total += item.preco * item.quantidade
    })

    document.getElementById("total").textContent =
        "Total: R$ " + total
}

function toggleCarrinho(){
    const carrinhoDiv = document.getElementById("carrinho")
    carrinhoDiv.classList.toggle("ativo")
}


localStorage.setItem("carrinho", JSON.stringify(carrinho))
carrinho = JSON.parse(localStorage.getItem("carrinho")) || []