import React, { Component } from 'react'
import formatCurrency from "../utils";

class Cart extends Component {
    render() {
        const { cartItems } = this.props;
        return (
            <div>
                {cartItems.length === 0 ? <div className="cart cart-header">Seu ainda está carrinho esta vazio</div> : <div className="cart cart-header">Você tem {cartItems.length} itens no carrinho</div>}
                <div>
                    <div className="cart">
                        <ul className="cart-items">
                            {cartItems.map(item => (
                                <li key={item.id}>
                                    <div>
                                        <img src={item.image} alt={item.title}></img>
                                    </div>
                                    <div>{item.title}</div>
                                    <div className="right-in-cart">
                                        {formatCurrency(item.price)} x {item.count}&nbsp;
                                        <button className="button" onClick={() => this.props.removeFromCart(item)}>Remover</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {cartItems.length !== 0 && (
                        <div className="cart">
                            <div className="total">
                                <div>
                                    Total:&nbsp;
                            {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
                                </div>
                                <button className="button primary">Continuar</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Cart
