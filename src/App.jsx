import { useState, useEffect } from 'react'
import './App.css'


function App() {
 
  

  const [livros,setLivros] = useState([])
  const [carregando,setCarregando] = useState(true)
  const [erro,setErro] = useState(false)
  const [quantidadeVisivel, setQuantidadeVisivel] = useState(10)
  const [catalogo, setCatalogo] = useState([])

  

  useEffect(() => {

  async function buscarCatalogo() {

    try {

      const generos = [
        { nome: 'Suspense', assunto: 'thrillers' },
        { nome: 'Romance', assunto: 'romance' }
      ]

      const resultados = await Promise.all(

        generos.map(async genero => {

          const parametros = new URLSearchParams({
            q: `subject:${genero.assunto} AND language:por`,
            sort: 'random',
            limit: '20',
            fields: 'key,title,author_name,cover_i,publisher'
          })

          const resposta = await fetch(
            `https://openlibrary.org/search.json?${parametros}`
          )

          if (!resposta.ok) {
            throw new Error('Erro ao buscar livros')
          }

          const dados = await resposta.json()

          return (dados.docs || []).map(livro => ({
            id: livro.key,
            titulo: livro.title,
            autor: livro.author_name?.join(', ') || 'Autor desconhecido',
            capa: livro.cover_i
              ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
              : null,
            editora: livro.publisher?.[0] || 'Não informada',
            genero: genero.nome,

            // Preço fictício para demonstração.
            // Depois podemos criar preços individuais.
            preco: 49.90
          }))

        })

      )

      const todosLivros = resultados.flat()

      // Evita livros repetidos
      const livrosUnicos = Array.from(
        new Map(todosLivros.map(livro => [livro.id, livro])).values()
      )

      setCatalogo(livrosUnicos)
      setLivros(livrosUnicos.slice(0, 10))

      setErro(livrosUnicos.length === 0)

    } catch (error) {

      console.error('Erro ao carregar catálogo:', error)
      setErro(true)

    } finally {

      setCarregando(false)

    }

  }

  buscarCatalogo()

}, [])

function carregarMais() {

  const novaQuantidade = Math.min(quantidadeVisivel + 10, 20)

  setQuantidadeVisivel(novaQuantidade)

  setLivros(catalogo.slice(0, novaQuantidade))

}

  return(
    <>
    <header className='cabecalho'>

      <div className='cabecalho_conteudo'>

      <div className='logo'>
        <img src= "Emblema de Íris sobre Livro Aberto - Copia.png" alt='logo Bloom'/>
        


        <div className='logo_texto'>
          <h1>Bloom</h1> 
          <p>livros que florecem em você</p>
        </div>
      </div>

      {/* navegação */}

     <nav className='menu'>
      <a href="#">Inicio</a>
      <a href="#">Catalogo</a>
      <a href="#">Sobre nós</a>
     </nav>

     {/* pesquisa */}

     <div className='pesquisa'>
      <span>⌕</span>

      <input type="text" placeholder='Buscar por titulo/autor(a) ou editora...' />
     </div>

     {/* ações do usuario */}

     <div className='acoes_usuario'>
    <a href="#">♙ Entrar</a>

    <span className='separador'></span>

    <a href="#" className='carrinho'>🛒 Carrinho 
      <span className='contador'>0</span>
    </a>
    

  </div>

  </div>

  </header>

    <main>
        


  {/* Banner principal */}
  <section className="banner">

    <div className="banner_conteudo">

      <p className="banner_subtitulo">
        ━ Bem-vindo à Bloom
      </p>

      <h2>
        Grandes histórias
        <br />
        te esperam
      </h2>

      <p className="banner_descricao">
        Descubra novos mundos, viva grandes emoções
        <br />
        e encontre o próximo livro favorito.
      </p>

      {/* Pesquisa do banner */}
      <div className="banner_pesquisa">

        <span>⌕</span>

        <input
          type="text"
          placeholder="Buscar por título, autor ou editora..."
        />

        <button>Buscar</button>

      </div>

      {/* Filtros de gênero */}
      <div className="filtros">

        <label>
          <input type="checkbox" />
          ♧ Suspense
        </label>

        <label>
          <input type="checkbox" />
          ♡ Romance
        </label>

        <label>
          <input type="checkbox" />
          Ambos
        </label>

      </div>

    </div>

  </section>

  {carregando && <p>carregando livros...</p>}

  {erro && <p>Não foi possivel carregar os livros.</p>}

  <section className='lancamento'>

    <div className='tituloSelecao'>
      <h2>Lançamentos</h2>
      <a href="#">Ver todos →</a>
    </div>

    <div className='listaLivro'>

     
  {livros.map((livro) => (

  <div className='livroCard' key={livro.id}>

    <div className='capaLivro'>

      {livro.capa ? (
        <img
          src={livro.capa}
          alt={`Capa de ${livro.titulo}`}
        />
      ) : (
        <p>Capa indisponível</p>
      )}

    </div>

    <h3>{livro.titulo}</h3>

    <p className='autor'>
      {livro.autor}
    </p>

    <span className='genero'>
      {livro.genero}
    </span>

    <p className='editora'>
      {livro.editora}
    </p>

    <p className='preco'>
      R$ {livro.preco.toFixed(2).replace('.', ',')}
    </p>

  </div>
        

))}

</div>

{carregando && <p>Carregando livros...</p>}

{erro && <p>Erro ao carregar livros </p>}

{livros.length < Math.min(catalogo.length, 20) && (

  <button 
  className='botaoCarregar'
  onClick={carregarMais}
  disabled={carregando}
  >
    Carregar mais
  </button>
)}


  </section>


  </main>

      <footer>
        <p>© 2026 Bloom - Livraria Virtual</p>
      </footer>

  </>
  )
}
export default App
