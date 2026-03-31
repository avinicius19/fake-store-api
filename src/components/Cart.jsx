import React, { useState } from 'react'
import './Cart.css'
import { IoIosCloseCircleOutline } from "react-icons/io";


const Cart = ({ cart, toggleCart, eraseProducts, totalPrices }) => {

    return (
        <div className='cart'>
            <div className="close">
                <h2>Carrinho</h2>
                <button onClick={toggleCart} ><IoIosCloseCircleOutline /></button>

            </div>

            {cart.length === 0 ? (<p>Seu carrinho esta vazio</p>)
                : (cart.map((product) => (
                    <div key={product.id} className='cart-product'>
                        <button onClick={() => eraseProducts(product.id)} ><IoIosCloseCircleOutline /></button>
                        <h4>{product.title}</h4>
                        <strong>Preço: {product.price}</strong>

                    </div>)
                ))}

            <div className="total">
                {totalPrices === 0 ? <span>R$ 0,00</span> : <h3>Total: {totalPrices.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })} </h3>}
            </div>

        </div>
    )
}

export default Cart