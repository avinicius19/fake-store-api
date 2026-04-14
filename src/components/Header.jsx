import './Header.css'
import { BsCartPlus } from "react-icons/bs";
const Header = ({ cart, toggleCart }) => {
    return (
        <header className='header'>
            <div className="container">
                <h1 className='titulo'>TemDeTudo</h1>

                <nav className='nav'>
                    {/* <a href="#">Home</a> */}
                    {/* <a href="#">Login</a> */}
                </nav>
                <div className="cart-icon" onClick={toggleCart}>
                    <BsCartPlus size={25} color="white" />
                    
                    {/* aparecer a qtd de itens apenas quando tiver item */}
                    {cart.length > 0 && <span>{cart.length}</span>}
                </div>
            </div>
        </header>
    )
}

export default Header