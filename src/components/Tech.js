import React from 'react';
import "./Clothes.css"
import { ITEM_TITLE } from '../graphql/queries/categories';
import { Query } from 'react-apollo';
import cart from '../img/Cart.svg';
import { Link } from 'react-router-dom';

class Tech extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '0',
      img: "",
    }
  }

  showCard(name, url) {
    this.props.showCard()
    this.setState({ id: name })
    this.setState({ img: url })
  }

  ChooseImg(url) {
    this.setState({ img: url })
  }

  render() {
    const index = this.props.currency.map(it => it.choosen).indexOf(true)

    return <>
      <div className={this.props.showCart ? "shadow-tech" : ''}>
        <div className='container'>
          <h1 className="categor-title">Tech</h1>
          <ul className="all-categor">
            <Query query={ITEM_TITLE} >
              {({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>

                const { products } = data.categories[1]

                return products.map(prod => <li key={prod.id} className={prod.inStock === false ? "out-of-stock" : "categor-item"} >
                  <p className="stok">{prod.inStock === false ? 'out of stok' : ''}</p>
                  {prod.inStock ?
                    <Link to="/techItem" onClick={() => this.props.showCard(prod.id)} className="link">
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
                    : <span>
                      <img className="categor-img"
                        src={prod.gallery[0]}
                        alt={prod.name}>
                      </img>

                      <p className="categor-title-item">{prod.name}</p>
                      <div className="price">
                        <p>{this.props.currency.map(it => it.choosen && it.symbol)}</p>
                        <p>{prod.prices[index].amount}</p>
                      </div>
                    </span>}
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

export default Tech;