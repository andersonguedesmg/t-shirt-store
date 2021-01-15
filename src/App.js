import './App.css';
import React from 'react'
import data from "./data.json";
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    }
  }

  filterSizeHandeler = (event) => {
    if (event.target.value === "") {
      this.setState({
        size: event.target.value,
        products: data.products
      })
    }
    else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (products) => products.availableSizes.indexOf(event.target.value) >= 0
        )
      })
    }
  }

  sortProductsPriceHandeler = (event) => {
    const sort = event.target.value;
    if (sort === "") {
      this.setState((state) => ({
        sort: sort,
        products: data.products
      }));
    }
    else {
      this.setState((state) => ({
        sort: sort,
        products: this.state.products
          .slice()
          .sort((a, b) =>
            sort === "lowest" ? a.price > b.price ? 1 : -1
              : sort === "highest" ? a.price < b.price ? 1 : -1
                : a._id < b._id ? 1 : -1
          ),
      }));
    }
  };

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
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">T-SHIRT STORE</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterSizeHandeler={this.filterSizeHandeler}
                sortProductsPriceHandeler={this.sortProductsPriceHandeler}>
              </Filter>
              <Products
                products={this.state.products}
                addToCart={this.addToCart}>
              </Products>
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} />
            </div>
          </div>
        </main>
        <footer>
          2021 Anderson Guedes | T-Shirt Store
        </footer>
      </div>
    );
  }
}

export default App;
