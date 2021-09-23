import React from 'react';
import "./Clothes.css"
import { ITEM_TITLE } from '../graphql/queries/categories';
import cart from '../img/Cart.svg';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom'





class Clothes extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    const index = this.props.currency.map(it => it.choosen).indexOf(true)
    return <>
      <div className={this.props.showCart ? "shadow" : ''}>
        <div className='container'>

          <h1 className="categor-title">Clothes</h1>
          <ul className="all-categor">
            <Query query={ITEM_TITLE} className="query">
              {({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>

                const { products } = data.categories[0]


                return products.map(prod => <li key={prod.id}
                  className={prod.inStock === false ? "out-of-stock" : "categor-item"} >
                  <p className="stok">{prod.inStock === false ? 'out of stok' : ''}</p>
                  <Link to='/clothesItem' onClick={() => this.props.showCard(prod.id)} className="link">
                    <img className="categor-img"
                      src={prod.gallery[0]}
                      alt={prod.name}>
                    </img>
                    <p className="categor-title-item">{prod.name}</p>
                    <div className="price">
                      <p>{this.props.currency.map(it => it.choosen && it.symbol)}</p>
                      <p>{prod.prices[index].amount}</p>
                    </div>
                  </Link>
                  <div className="cart" onClick={() => this.props.itemToCart(prod)}>
                    <img
                      className="catr-item-icon"
                      src={cart}
                      alt="cart"
                    />
                  </div>

                </li>)
              }
              }

            </Query>
          </ul>
        </div>
      </div>
    </>
  }
}
export default Clothes;