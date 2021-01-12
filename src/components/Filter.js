import React, { Component } from 'react'

export class Filter extends Component {
    render() {
        return (
            <div className="filter">
                <div className="filter-result">{this.props.count} Produtos</div>
                <div className="filter-sort">
                    Ordenar pelo:&nbsp;
                    <select value={this.props.sort} onChange={this.props.sortProductsPriceHandeler}>
                        <option value="">Nenhum</option>
                        <option value="lowest">Mais barato</option>
                        <option value="highest">Mais caro</option>
                    </select>
                </div>
                <div className="filter-size">
                    Tamanho:&nbsp;
                    <select value={this.props.size} onChange={this.props.filterSizeHandeler}>
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

export default Filter
