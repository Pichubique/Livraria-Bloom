//carrega o carrinho

export function carregarCarrinho(){

try{
	return JSON.parse(localStorage.getItem('carrinho')) || [] 
}catch{
	return []
  }

}

//Salva o carrinho

export function salvarCarrinho(carrinho){
	localStorage.setItem('carrinho', JSON.stringify(carrinho))
}

//Adiciona produto

export function adicionarProduto(carrinho,livro){
	const produto = carrinho.find(item => item.id === livro.id)

	if(produto){
return carrinho.map(item =>
item.id === livro.id
?{...item, quantidade: item.quantidade + 1}
:item
)
}
return[
	...carrinho,{
	id: livro.id,
	nome: livro.nome,
	preco: livro.preco,
	quantidade: 1

}
]
}

 //calcula o valor total

export function calculoTotal(carrinho){
	return carrinho.reduce(
(total, item) => total + item.preco * item.quantidade,0)

}

//Diminui a quantidade ou remove o produto do carrinho

export function removerProduto(carrinho, id){
	const produto = carrinho.find(item => item.id === id)

if(!produto) return carrinho

if(produto.quantidade > 1){
return carrinho.map(item => item.id === id
?{...item, quantidade: item.quantidade - 1}
: item
)
}
return carrinho.filter(item => item.id !== id)
}

//aumenta a quantidade

export function aumentarQuantidade(carrinho, id){
return carrinho.map(item => item.id === id
?{...item,quantidade: item.quantidade + 1}
: item 
)

}


//esvazia o carrinho

export function esvaziarCarrinho(){
	return []
}