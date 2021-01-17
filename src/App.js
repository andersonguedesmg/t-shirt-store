import './App.css';
import React from 'react'
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    }
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;

    cartItems.forEach(item => {
      if (item.id === product.id) {
        item.count++;
        alreadyInCart = true
      }
    });

    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 })
    }
    this.setState({ cartItems })
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter(x => x.id !== product.id)
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x => x.id !== product.id)))
  };

  createOrder = (order) => {
    alert("Salvar o pedido de " + order.name)
  };

  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">T-SHIRT STORE</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter></Filter>
                <Products addToCart={this.addToCart}></Products>
              </div>
              <div className="sidebar">
                <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder} />
              </div>
            </div>
          </main>
          <footer>
            2021 Anderson Guedes | T-Shirt Store
          </footer>
        </div>
      </Provider>
    );
  }
}

export default App;
