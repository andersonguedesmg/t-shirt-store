import './App.css';
import React from 'react'
import data from "./data.json";
import Products from './components/Products';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      products: data.products,
      size: "",
      sort: ""
    }
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
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">
              Cart Itens
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
