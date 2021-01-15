import React, { Component } from 'react'
import formatCurrency from "../utils";
import Fade from 'react-reveal/Fade';

class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false,
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createOrder = (event) => {
        event.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        };
        this.props.createOrder(order);
    }

    render() {
        const { cartItems } = this.props;
        return (
            <div>
                {cartItems.length === 0 ? <div className="cart cart-header">Seu ainda está carrinho esta vazio</div> : <div className="cart cart-header">Você tem {cartItems.length} itens no carrinho</div>}
                <div>
                    <div className="cart">
                        <Fade left cascade>
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
                        </Fade>
                    </div>
                    {cartItems.length !== 0 && (
                        <div>
                            <div className="cart">
                                <div className="total">
                                    <div>
                                        Total:&nbsp;{formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
                                    </div>
                                    <button onClick={() => { this.setState({ showCheckout: true }) }} className="button primary">Continuar</button>
                                </div>
                            </div>
                            {this.state.showCheckout && (
                                <Fade right cascate>
                                    <div className="cart">
                                        <form onSubmit={this.createOrder}>
                                            <ul className="form-container">
                                                <li>
                                                    <label>Nome:</label>
                                                    <input type="text" name="name" required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <label>Email:</label>
                                                    <input type="email" name="email" required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <label>Endereço:</label>
                                                    <input type="text" name="address" required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <button className="button primary" type="submit">Checkout</button>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </Fade>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Cart
