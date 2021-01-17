import React, { Component } from 'react';
import formatCurrency from '../utils';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { removeFromCart } from '../actions/cartActions';
import { createOrder, clearOrder } from '../actions/orderActions';

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
            total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
        };
        this.props.createOrder(order);
    }

    closeModal = () => {
        this.props.clearOrder();
    };

    render() {
        const { cartItems, order } = this.props;
        return (
            <div>
                {cartItems.length === 0 ? <div className="cart cart-header">Seu ainda está carrinho esta vazio</div> : <div className="cart cart-header">Você tem {cartItems.length} itens no carrinho</div>}
                {order && <Modal isOpen={true} onRequestClose={this.closeModal}>
                    <Zoom>
                        <button className="close-modal" onClick={this.closeModal}>x</button>
                        <div className="order-details">
                            <h3 className="success-message">Seu pedido foi feito!</h3>
                            <h2>Pedido: {order._id}</h2>
                            <ul>
                                <li>
                                    <div>Nome:</div>
                                    <div>{order.name}</div>
                                </li>
                                <li>
                                    <div>Email:</div>
                                    <div>{order.email}</div>
                                </li>
                                <li>
                                    <div>Endereço:</div>
                                    <div>{order.address}</div>
                                </li>
                                <li>
                                    <div>Data:</div>
                                    <div>{order.createdAt}</div>
                                </li>
                                <li>
                                    <div>Total:</div>
                                    <div>{formatCurrency(order.total)}</div>
                                </li>
                                <li>
                                    <div>Itens no carrinho:</div>
                                    <div>
                                        {order.cartItems.map((x) => (
                                            <div>
                                                {x.count} {" x "} {x.title}
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Zoom>
                </Modal>}
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

export default connect((state) => ({ cartItems: state.cart.cartItems, order: state.order.order }), { removeFromCart, createOrder, clearOrder })(Cart);
