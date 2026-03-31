import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ListaProdutos from './components/ListaProdutos'
import Cart from './components/Cart';

function App() {

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  /*  muda o estado anterior do isCartOpen, se estiver false, não abre, se estiver true, abre carrinho */
  const toggleCart = () => {
    setIsCartOpen(prev => !prev)
    console.log(isCartOpen);

  }

  /* joga os itens para o carrinho | cart */
  const addToCart = (product) => {
    setCart(prev => [...prev, product])
    console.log(product);
    console.log(cart);
  }


  /* transforma o array de preços em um só, somando apenas o price */
  const totalPrices = cart.reduce((acc, product) => {
    return acc + product.price;
  }, 0)

  /* ao clicar no produto, o id do item clicado é passado como parametro na função, e depois comparado com o product.id */
  const eraseProducts = (id) => {
    const erased = cart.filter((product) => product.id !== id)
    setCart(erased)
    console.log(erased);
  }

  return (

    <div className="app">
      <Header cart={cart} toggleCart={toggleCart} />
      <ListaProdutos addToCart={addToCart} cart={cart} />

      {/* Se isCartOpen for true, o carrinho aparece */}
      {isCartOpen && <Cart cart={cart} toggleCart={toggleCart} totalPrices={totalPrices} eraseProducts={eraseProducts} />}
    </div>


  )
}

export default App
