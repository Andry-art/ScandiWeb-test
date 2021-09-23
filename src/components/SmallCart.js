import React from 'react'
import './SmallCart.css'
import { Link } from 'react-router-dom'


class SmallCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      size: null,
    }
  }

  changeSize(id, size) {
    this.setState({ size: size })
    this.props.chooseSizeInCart1(id, size)
  }

  render() {
    const { minusItemsInCart } = this.props
    const { plusItemsInCart } = this.props
    const { itemsInCart } = this.props
    const index = this.props.currency.map(it => it.choosen).indexOf(true)

    return <>
      <div className="small-cart" >
        {itemsInCart.length === 0 ?
          <p className="emptyCart">Cart is empty</p>
          :
          <ul>
            <h3 className="titleSmallCart">My bag, <p>{itemsInCart.reduce((sum, prev) => sum + prev.count, 0)} items</p></h3>
            {itemsInCart.map((prod, i) => i < 2 && <li key={prod.name.id}>
              <h2 className="SCbrand" >{prod.name.brand}</h2>
              <h3 className="SCbrand" >{prod.name.name}</h3>
              <div className="SCprice">
                <p>{this.props.currency.map(it => it.choosen && it.symbol)}</p>
                <p>{prod.name.prices[index].amount}</p>
              </div>
              <div className="SCsize">
                {prod.name.attributes.map((it, index) =>
                  index === 0 && it.items.map((it, index) =>
                    <div key={it.value} className={prod.option1 === index ? 'box-choosen' : 'box'}
                      onClick={() => this.changeSize(prod.name.id, index)} ><p>{it.displayValue}</p>
                    </div>))}
              </div>

              <img src={prod.name.gallery[0]} />
              <div className="countItem">
                <div className="plus" onClick={() => plusItemsInCart(prod.name.id)}><p>+</p></div>
                <p> {prod.count}</p>
                <div className="minus" onClick={() => minusItemsInCart(prod.name.id)}><p>-</p></div>
              </div>
            </li>)}
            <div className="SCprice">
              <p className="total">Total:</p>
              <p className="total-price">{this.props.currency.map(it => it.choosen && it.symbol)}</p>
              <p className="total-num">{Math.floor(itemsInCart.reduce((sum, current) =>
                sum + (current.name.prices[index].amount * current.count), 0) * 100) / 100}
              </p>
            </div>
          </ul>}
        <Link to='/'> <button className='btn-view' onClick={() => this.props.showCartFun()}>VIEW BAG</button></Link>
        <button className='btn-check'>CHECK OUT</button>
      </div>
    </>
  }
}

export default SmallCart;