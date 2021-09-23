import React from 'react';
import { CATEGORIES } from '../graphql/queries/categories';
import { Query } from 'react-apollo';
import { NavLink, Link } from 'react-router-dom'
import SmallCart from './SmallCart';

import logo from '../img/a-logo.svg'
import cart from '../img/Cart.svg'
import errow from '../img/Vector.svg'


class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    document.body.addEventListener('click', this.props.clickOut);
  }

  render() {
    const { currency } = this.props.state
    const { visible } = this.props.state
    const { itemsInCart } = this.props.state

    return <>
      <div className="header">
        <ul className="menu">
          <Query query={CATEGORIES}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>

              const { categories } = data

              return categories.map((categ, index) => <li key={categ.name} className="menu-item" >
                <NavLink to={categ.name} className="link"><p className="menu-item-text">{categ.name} </p>
                  <span className="underline"></span></NavLink></li>)
            }
            }
          </Query>
        </ul>

        <Link to='/'>  <img
          className="header-logo"
          src={logo}
          alt="logo"
        /></Link>

        {itemsInCart.length === 0 ? '' :
          <div className="totalItemsInCart"><p>{itemsInCart.reduce((sum, prev) => sum + prev.count, 0)}</p></div>}
        <div className="icons">
          <div ref={this.props.curRef} className="frame" onClick={() => this.props.currencyVisible()}>
            <p className='header-frame' >
              {currency.map(it => it.choosen && it.symbol)}
            </p>

            {visible && <div className="currancy-frame">
              <ul>
                {currency.map(it => <li key={it.id} className={it.choosen ? 'cur-item-chose' : "cur-item"}
                  onClick={() => this.props.handleСurrency(it.id)}>
                  {it.symbol} {it.money}</li>)}
              </ul>
            </div>
            }

            <img
              className={visible ? 'header-errow-open' : 'header-errow'}
              src={errow}
              alt="errow"
            />
          </div>

          <img
            className="header-cart"
            src={cart}
            alt="cart"
            onClick={() => this.props.showCartFun()}
            ref={this.curRef2}
          />
          {this.props.showCart && <SmallCart
            itemsInCart={this.props.state.itemsInCart}
            currency={this.props.state.currency}
            plusItemsInCart={this.props.plusItemsInCart}
            minusItemsInCart={this.props.minusItemsInCart}
            chooseSizeInCart1={this.props.chooseSizeInCart1}
            showCartFun={this.props.showCartFun} />}
        </div>
      </div>
    </>
  }
}

export default Header;