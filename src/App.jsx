import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import ListaProdutos from './components/ListaProdutos'
import Cart from './components/Cart';

function App() {

  const [cart, setCart] = useState(() => {
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
      return JSON.parse(savedItems)
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  /* localstorage */
  useEffect(() => {
    localStorage.getItem('items', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(cart))
  }, [cart])

  /*  muda o estado anterior do isCartOpen, se estiver false, não abre, se estiver true, abre carrinho */
  const toggleCart = () => {
    setIsCartOpen(prev => !prev)
  }

  /* joga os itens para o carrinho | cart */
  const addToCart = (product) => {

    /* Procura no carrinho e vê se já existe um item com o mesmo id do produto que eu acabei de clicar */
    const existingProduct = cart.find(itemNoCarrinho => itemNoCarrinho.id === product.id)

    if (existingProduct) {
      /* Somente o item que tem o mesmo id do produto clicado tem a quantity incrementada (+1) */
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
          /* manter os outros itens */
        } else {
          return item;
        }
      })

      setCart(updatedCart)
      /* adiciona novo produto */
    } else {
      setCart(prev => [...prev, { ...product, quantity: 1 }])
    }

  }


  /* transforma o array de preços em um só, somando apenas o price */
  const totalPrices = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0)

  /* ao clicar no produto, o id do item clicado é passado como parametro na função, e depois comparado com o product.id */
  const eraseProducts = (id) => {

    /* Procura no carrinho e vê se já existe um item com o mesmo id do produto que eu acabei de clicar */
    const existingProduct = cart.find((itemNoCarrinho) => itemNoCarrinho.id === id);

    if (existingProduct.quantity > 1) {
      const removingIdProducts = cart.map((item) => {
        /* item.id -> esta no carrinho | id -> item clicado */
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1
          }
        } else {
          return item;
        }
      })
      setCart(removingIdProducts);

    } else {
      const erased = cart.filter((product) => product.id !== id)
      setCart(erased)
    }

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
