import React, { Component } from 'react'
import formatCurrency from "../utils";
import Fade from 'react-reveal/Fade';

class Products extends Component {
  render() {
    return (
      <div>
        <Fade bottom cascade={true}>
          <ul className="products">
            {this.props.products.map(product => (
              <li key={product.id}>
                <div className="product">
                  <a href={"#" + product.id}>
                    <img src={product.image} alt={product.title}></img>
                    <p>
                      {product.title}
                    </p>
                  </a>
                  <div className="product-price">
                    <div>
                      {formatCurrency(product.price)}
                    </div>
                    <button onClick={() => this.props.addToCart(product)} className="button primary">Adicionar</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
      </div>
    )
  }
}

export default Products
