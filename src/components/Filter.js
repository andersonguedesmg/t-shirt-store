import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterProducts, sortProducts } from '../actions/productActions';

class Filter extends Component {
    render() {
        return !this.props.filteredProducts ? (
            <div>Loading...</div>)
            : (
                <div className="filter">
                    <div className="filter-result">{this.props.filteredProducts.length} Produtos</div>
                    <div className="filter-sort">
                        Ordenar pelo:&nbsp;
                        <select value={this.props.sort} onChange={(e) => this.props.sortProducts(this.props.filteredProducts, e.target.value)}>
                            <option value="">Nenhum</option>
                            <option value="lowest">Mais barato</option>
                            <option value="highest">Mais caro</option>
                        </select>
                    </div>
                    <div className="filter-size">
                        Tamanho:&nbsp;
                        <select value={this.props.size} onChange={(e) => this.props.filterProducts(this.props.products, e.target.value)}>
                            <option value="">Todos</option>
                            <option value="PP">PP</option>
                            <option value="P">P</option>
                            <option value="M">M</option>
                            <option value="G">G</option>
                            <option value="GG">GG</option>
                            <option value="XGG">XGG</option>
                            <option value="G1">G1</option>
                            <option value="G2">G2</option>
                            <option value="G3">G3</option>
                            <option value="G4">G4</option>
                        </select>
                    </div>
                </div>
            )
    }
}
export default connect(
    (state) => ({
        size: state.products.size,
        sort: state.products.sort,
        products: state.products.items,
        filteredProducts: state.products.filteredItems,
    }),
    {
        filterProducts,
        sortProducts,
    }
)(Filter);
