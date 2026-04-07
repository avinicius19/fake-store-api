import React, { useEffect, useState } from 'react'
import './ListaProdutos.css'

import axios from 'axios';

const ListaProdutos = ({ addToCart, cart }) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        /* loading fica true, pois esta carregando antes de vir os dados da API */
        setLoading(true);
        axios({
            method: 'GET',
            url: 'https://dummyjson.com/products'
        }).then(res => {
             /* o state data, esta com todos os dados da API */
            setData(res.data.products);
        }).catch(error => {
            console.log(error);
        }).finally(() => setLoading(false))
    }, [])

    return (
        <div className='products-container'>
            {loading && <h1>Carregando produtos...</h1>}
            {data.map((product) => (
                <div key={product.id} className='card'>
                    <img src={product.images} alt={product.title} />
                    <div className="card-description">
                        <h1>{product.title}</h1>
                        <strong>Preço: R$ {product.price}</strong>
                    </div>
                    <button className='buy' onClick={() => addToCart(product)}>Comprar</button>
                </div>
            ))}
        </div>
    )
}

export default ListaProdutos

/* quantity + 1 ao clicar */